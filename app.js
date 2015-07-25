var express = require('express'); 
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var mongoose = require('mongoose');
 
var jwt = require('jwt-simple');
var token = jwt.encode({username: 'milesh'}, 'supersecretkey');
var _ = require('lodash');  //utility library for common tasks
var secretKey = 'supersecretkey';
var bcrypt = require('bcrypt');

app.use(favicon(__dirname + '/public/images/daybreaksun16px.ico'));
app.use(express.static(__dirname + '/public')); //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

try {
        var uristring = require('./data/mongolabinfo.js').loginstring;
    }
        catch(err){
    }   

var db = mongoose.connect(uristring);

var User = db.model('user', 
    {   
    userName    :  String,
    password    :  {type: String, select: false}, //!important
    email       :  String,
    created     :  {type: Date},
    userAbout   :  String
    });

var Day = db.model('day',
    {
    dayName            : String,
    userName           : String,
    dayCreateDate      : {type: Date},
    dayUpdateDate      : {type: Date},
    dayDate            : {type: Date},
    dayDesc            : String,
    dayGroup           : String,
    dayTags            : Array, 
    locations          : Array,
    images             : Array
    });

var anImage = db.model('image',{
    userName            : String,
    dayImage           : { data: Buffer, contentType: String } 
});

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
 
/* GET home page. */
    router.get('/', function(req, res) {
      res.json({ message: 'hooray! welcome to our api!' });
    });

//SERVES AN HTML PAGE, NEXT ONE IS API ENDPOINT SERVING JSON
app.get('/show', function(req,res,next){
    Day.find(function(err, Days){
        if (err) 
            {return next(err)}
        else
            {
            //res.json({message: ' that worked '})  return success message
            //console.log("we good");
            res.sendFile(__dirname + '/public/show.html')  //returns show.html
            }
    })
 })

//SERVES A JSON OBJECT
//find first N items

app.get('/api/show', function(req,res,next){
    //now we sort via mongoose, not in angular, then truncate and respond
    Day.find({}).sort({dayCreateDate: 'descending'}).limit(6).exec(function(err, Days){
        if (err) 
            {return next(err)}
        else
            {
            console.log("we good at the api");
            res.status(201).json(Days); //returns saved Days object
            }
    })
});


/* POST to Add Trip Service */
router.route('/addday').post(function(req, res) {
//console.log('in add day: ', req);
    var newDayDoc = new Day({
        dayName:       req.body.dayName,
        userName:       req.body.userName,
        dayCreateDate: Date.now(),
        dayUpdateDate: Date.now(),
        dayDate:       Date.now(),
        dayDesc:       req.body.dayDesc,
        dayGroup:      req.body.dayGroup,
        dayTags:           req.body.dayTags,
        locations:      req.body.dayLocations,
        images:         req.body.images
        });

    var newImage = new anImage({
        image: req.body.image
    });

    newImage.save(function(err, newImage){
        if (err) {
            return console.error(err);
            }
    });

    newDayDoc.save(function(err, newDayDoc){
        if (err) {
            return console.error(err);
            }
        res.status(201).json(newDayDoc); //returns saved day object
     });
});

 //1B Creates a new user and pwd combination and saves it 
app.post('/user', function(req,res,next){
    console.log("Create user request at /user : " + req.body.username );
     //assign all values except password
    var user = new User({   userName: req.body.username,
                            created: Date.now(),
                            email: req.body.email,
                            userAbout: "Placeholder info about user"
                         });
    console.log("password should be undefined:  " + user.password);
    //asynchronous call of bcrypt
    bcrypt.hash(req.body.password, 10, function(err, hash) {    
    // Store hash in password DB.
        console.log("BCRYPT password hash is " + hash);
        user.password = hash;//note definition of user.password in schema
        //all values of user object now assigned
        user.save(function(err){
            if (err){throw next(err)}
            res.sendStatus(201)
        });
    });
});
 

//2  Takes user name and password hash stored client side, and 
//bcrypt compares incoming password to hash password in db
//If name pwd match, then returns a jwt token.
app.post('/session', function(req,res,next){
    // Mongoose findOne method
    // set username to incoming req.body.username and find that value
    User.findOne({userName: req.body.username})
        .select('password')   //grab password of that username
        .exec(function(err,user){
        if (err){return next(err)}
        if(!user){return res.sendStatus(401)}

         console.log(req.body.password + " is req.body.password");
         console.log(user.password + " is user.password");   
        //if user is found check incoming pwd against stored pwd
        bcrypt.compare(req.body.password, user.password, function(err,valid){
            if (err){ return next(err);};
            // !valid means invalid name password combo - bcrypt asigns boolean
            if(!valid){ return res.sendStatus(401)};
            //if valid then generate token based on user name
            console.log("user.username for jwt.encode is " + user.username);   
            console.log("req.body.username for jwt.encode is " + req.body.username);

            //encode the incoming req.body.username with secretKey   
            var token = jwt.encode({username: req.body.username}, secretKey);
            console.log("user/pwd combo found and token is " + token);
            res.json({token: token, user: req.body.username});

            
        });
    });
}); 
 
//3 decode jwt token to return username
//Takes the jwt token stored client side and returns the username
app.get('/user', function(req,res){
    var token = req.headers['x-auth'];
    console.log ("token is " + token);
    var auth  = jwt.decode(token, secretKey);
    console.log('auth is ' + auth);
    console.log('auth.username is ' + auth.username);
    User.findOne({userName: auth.username}, function(err,user){

        res.json(user.userName);
        console.log("user.userName is " + user.userName);

    });
});


app.use('/api',router);  //this probably needs to be near bottom of page
 

app.listen(3000);
console.log('listening on port 3000!');
