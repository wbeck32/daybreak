var express = require('express'); 
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');

//imported
// var User = require('./user');   
// var user = require('./user');
//var router = express.Router();
var jwt = require('jwt-simple');
var token = jwt.encode({username: 'milesh'}, 'supersecretkey');
var _ = require('lodash');  //utility library for common tasks
var secretKey = 'supersecretkey';
var bcrypt = require('bcrypt');
//imported

app.use(favicon(__dirname + '/public/images/daybreaksun16px.ico'));
app.use(express.static(__dirname + '/public')); //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//local with local mongo db testing 
// var db = mongoose.connect('mongodb://localhost/daybreak');
 
try {
    var uristring = require('./data/mongolabinfo.js').loginstring;
    //console.log("trying local mongolab string" + uristring);
    }
catch(err){
    //console.log("no connection file so go on to Heroku config var");
    //var uristring = process.env.MONGOLAB_URI;   //if Heroku env
    }   
console.log("DB Connection: "+ uristring);

// mongoose.connect(uristring, function(err,db2){
//     if (err) throw err;
//     app.set('mongo', db2);
// });

var db = mongoose.connect(uristring);

//database schemas for User and Day and Image
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
    tripName            : String,
    userName            : String,
    tripCreateDate      : {type: Date},
    tripUpdateDate      : {type: Date},
    tripDate            : {type: Date},
    tripDesc            : String,
    tripGroup           : String,
    tags                : Array, 
    locations           : Array,
    images              : Array
    });

var anImage = db.model('image',{
    userName            : String,
    tripImage           : { data: Buffer, contentType: String } 
})

router.use(function(req, res, next) {
    // do logging
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
    Day.find({}).sort({tripCreateDate: 'descending'}).limit(6).exec(function(err, Days){
        if (err) 
            {return next(err)}
        else
            {
            console.log("we good at the api");
            res.status(201).json(Days); //returns saved Days object
            }
    })
});


/* GET home page. */
// router.get('/show', function(req, res, next) {
//    //console.log('SHOW is happening.');
//    res.json({ message: 'here will be a list of trips' });
//     res.sendFile('./show.html');
// });
 

/* POST to Add Trip Service */
router.route('/addday').post(function(req, res) {

    var newDayDoc = new Day({
        tripName:       req.body.tripName,
        userName:       req.body.userName,
        tripCreateDate: Date.now(),
        tripUpdateDate: Date.now(),
        tripDate:       Date.now(),
        tripDesc:       req.body.tripDesc,
        tripGroup:      req.body.tripGroup,
        tags:           req.body.tags,
        locations:      req.body.locations,
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
        //if user is found check incoming pwd against stored pwd
        bcrypt.compare(req.body.password, user.password, function(err,valid){
            if (err){ return next(err);};
            // !valid means invalid name password combo - bcrypt asigns boolean
            if(!valid){ return res.sendStatus(401)};
            //if valid then generate token based on user name   
            var token = jwt.encode({username: user.username}, secretKey);
            console.log("user/pwd combo found and token is " + token);
            res.json(token);
        });
    });
}); 
 
//3 decode jwt token to return username
//Takes the jwt token stored client side and returns the username
app.get('/user', function(req,res){
    var token = req.headers['x-auth'];
    var auth  = jwt.decode(token, secretKey);
    User.findOne({userName: auth.username}, function(err,user){
        res.json(user);
    });
});


app.use('/api',router);  //this probably needs to be near bottom of page
 
//module.exports = router;
app.listen(3000);
console.log('listening on port 3000!');
