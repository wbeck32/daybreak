var express = require('express'); 
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var mongoose = require('mongoose');
 
var jwt = require('jwt-simple');
var token = jwt.encode({username: 'milesh'}, 'supersecretkey');
var _ = require('lodash');  //utility library for common tasks
var secretKey = 'supersecretkey';
var bcrypt = require('bcrypt');


var loginmailgun = require('./data/loginmailgun.js');
var transporter = nodemailer.createTransport(smtpTransport({
  host: 'smtp.mailgun.org',
  auth: {
    user: loginmailgun.user,
    pass: loginmailgun.pass
  }
}));
   
  
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
    userName            :  String,
    displayname         :  String,
    displayimage        :  String,
    password            :  {type: String, select: false}, //!important
    email               :  String,
    created             :  {type: Date},
    userAbout           :  String,
    deletedon           :  {type: Date},
    visitcount          :  String,
    visitdatetimes      :  {type:Date},
    dayscreatedcount    :  String,
    likesgivencount     :  String,
    likesreceivedcount  :  String
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
    //console.log('Router.use is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

/////////////////////////////////////////////////////////////////////



  
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
    Day.find({}).sort({dayCreateDate: 'descending'}).limit(20).exec(function(err, Days){
        if (err) 
            {return next(err)}
        else
            {
            console.log("we good at the api");
            res.status(201).json(Days); //returns saved Days object
            }
    })
});

 
//tag based search  
router.route('/taglookup').post(function(req,res,next){
        console.log ("at api incoming req.tag is... " + req.body.tag);
        
        tagString = req.body.tag;
        //console.log('tagString is: ', tagString)
       //transform incoming string to array
        //find commas, create array (which has different commas)
        tagArray = tagString.split(",");


//WHILE ARRAY.length IS > 0

        //hand the array to mongo - require $all tags to be present
        Day.find( { dayTags: { $all: tagArray  }})
            .sort({dayCreateDate: 'descending'})
            .exec(function(err,Day)

             //IF DAY=== undefined
                //CUT LAST ELEMENT OFF ARRAY
                //RECURSIVELY CALL DAY.FIND
                //UNTIL DAY.LENGTH > 0 
                    //RETURN DAY
        {
        if (err)
            {console.log('error at tag api endpoint');
             return next(err);}
        else
            {
            console.log("~~~~~~at lookup API found tag...: ", Day );


            res.json(Day);  //???
            }
        })
});

router.route('/getday').post(function(req,res, next){

    console.log ('@@@@@@@@@ api endpoint receives dayID', req.body.dayID);
  
    Day.find( { '_id':  req.body.dayID   } ).exec(function(err, Day)
        {
        if (err)
            {console.log('error at api endpoint');
             return next(err);}
        else
            {
        console.log("~~~~~~~at getday API found day requested at api", Day);
            res.json(Day);  //???
            }
    })
});


/* POST to Add Trip Service */
router.route('/addday').post(function(req, res) {
    var newDayDoc = new Day({
        dayName:       req.body.dayName,
        userName:       req.body.userName,
        dayCreateDate: Date.now(),
        dayUpdateDate: Date.now(),
        dayDate:       Date.now(),
        dayDesc:       req.body.dayDesc,
        dayGroup:      req.body.dayGroup,
        dayTags:        req.body.dayTags,
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

////////////////////////////////////////////////////
/// endpoint for registering valid user which is 
// 1) password confirmed  2) not duplicate username 
// 3) not duplicate email  4) user clicks registration button
//////////////////////////////////////////////////////////
 
router.route('/registerValidUser').post(function(req,res,next){
    //console.log("Create user request for user : " + req.body.username );
    //assign all values except password
    var user = new User({   userName: req.body.username,
                            created: Date.now(),
                            email: req.body.email,
                            userAbout: "My perfect day would be..... "
                         });
    //asynchronous call of bcrypt
    bcrypt.hash(req.body.password, 10, function(err, hash) {    
    // Store hash in password DB.
        //console.log("BCRYPT password hash is " + hash);
        user.password = hash;//note definition of user.password in schema
        //all values of user object now assigned
        //console.log(user);
        user.save(function(err){
            if (err){
                throw next(err);
            } else {
                res.sendStatus(201)
            }
        });
    });
});


//THE REAL THING HERE ////////////////////////////////////////////////
app.post('/api/passwordresetemail', function(req, res) {
  //var db = app.get('mongo');
  //var users = db.collection('users');

  // FIND USER WITH req.body.email
  // send email with 24 hour token
   // TODO - Function that looks for 24 hour token, links to password reset page  


  // users.find({username: req.body.username}).toArray(function(err, docs){
  //   if (err) console.log(err);
  //   if (docs[0].email) {
  //     var resetPasswordMailOptions = {
  //       from: 'Daybreak <hello@daybreak.com>', // sender address
  //       to: docs[0].email, 
  //       subject: 'Daybreak password reset', // Subject line
  //       text: 'Please click on this link to reset your password', // plaintext body
  //       html: '<div>Hello, </div><div>Please click <a href=http://www.daybreak.com/api/passwordreset/' + passwordResetAuthenticate(docs[0]._id) + '>here</a> to reset your password. This link will only be valid for 24 hours.</div><div>Thanks!</div><div>The Daybreak</div>' // html body
  //     };
  //     transporter.sendMail(resetPasswordMailOptions, function(err, info) {
  //       if (err) console.log(err);  
  //       console.log('Email sent!');
  //       res.end('Email sent!');
  //     });
  //   } else {
  //     res.end('Cannot reset password for this user');
  //   }
  // });
});

//3 reset password - rewrite for Daybreak
// router.route('/passwordresetemail').post(function(req,res,next){
    
//     var user = new User({userName: req.body.email });
    
//     User.findOne({userName: req.body.email})
//         .select('email') 
//         .exec(function(err,user){                      
//                 console.log(user +  " is user");

//                 if (err){
//                     console.log("error in mongoose findOne for email");
//                     return next(err);
//                     }
//                 if(!user){
//                     result = true;  //user with that email does not exist!
//                     return res.json(result); 
//                     }
//                 else{
//                     result = false;  //hooray a user with that email exists

//                     var resetPasswordMailOptions = {
//                         from: 'Daybreak <hello@daybreak.com>', // sender address
//                         to: docs[0].email, 
//                         subject: 'Daybreak Password Reset', // Subject line
//                         text: 'Please click on this link to reset your password', // plaintext body
//                         html: '<div>Hello, </div><div>Please click <a href=http://www.daybreak.com/api/passwordreset/' + passwordResetAuthenticate(docs[0]._id) + '>here</a> to reset your password. This link will only be valid for 24 hours.</div><div>Thanks!</div><div>The Daybreak</div>' // html body
//                         };

//                         transporter.sendMail(resetPasswordMailOptions, function(err, info) {
//                             if (err) console.log(err);  
//                             console.log('Email sent!');
//                             res.end('Email sent!');
//                             });

//                     return res.json(result);
//                 }
//          });
//   });

// });

//roadwarrior code
app.post('/api/passwordresetemail DEMONSTRATION ONLY', function(req, res) {
  var db = app.get('mongo');
  var users = db.collection('users');
  users.find({username: req.body.username}).toArray(function(err, docs){
    if (err) console.log(err);
    if (docs[0].email) {
      var resetPasswordMailOptions = {
        from: 'Daybreak <hello@daybreak.com>', // sender address
        to: docs[0].email, 
        subject: 'Daybreak password reset', // Subject line
        text: 'Please click on this link to reset your password', // plaintext body
        html: '<div>Hello, </div><div>Please click <a href=http://www.daybreak.com/api/passwordreset/' + passwordResetAuthenticate(docs[0]._id) + '>here</a> to reset your password. This link will only be valid for 24 hours.</div><div>Thanks!</div><div>The Daybreak</div>' // html body
      };
      transporter.sendMail(resetPasswordMailOptions, function(err, info) {
        if (err) console.log(err);  
        console.log('Email sent!');
        res.end('Email sent!');
      });
    } else {
      res.end('Cannot reset password for this user');
    }
  });
});



//1d  checks for duplicate username - If UNIQUE then TRUE
router.route('/checkusername').post(function(req,res,next){
   
    var user = new User({userName: req.body.username });

    console.log("in api userName to search is " +req.body.username);

    User.findOne({userName: req.body.username})
        .select('userName') 
        .exec(function(err,user){                     
                if (err){
                    console.log("error in mongoose findOne");
                    return next(err);
                    }
                if(user === null){ console.log('this is a unique user');
                    res.send(true);  //hooray found a unique user!
                    }
                else{
                    res.send(false);  //sorry name already exists

                }
            
         });
  });


//1d  checks for duplicate email
router.route('/checkemail').post(function(req,res,next){
   
    console.log("in api email to search is " +req.body.email);

    var user = new User({email: req.body.email });

    User.findOne({email: req.body.email})
        .select('email')
        .exec(function(err,user){

                console.log(user+  " is user at checkemail route");
 
                if (err){
                    return next(err)
                }
                if(!user){
                    result = true;  //hooray found a unique email!
                    return res.json(result); 

                }
                else{
                    result = false;  //sorry email already exists
                    return res.json(result);
                }
        });
});
 
 
//2  LOGIN Takes user name and password hash stored client side, and 
//bcrypt compares incoming password to hash password in db
//If name pwd match, then returns a jwt token.
router.route('/session').post(function(req,res,next){
    console.log('session: ',req.body.username);
    // Mongoose findOne method
    // set username to incoming req.body.username and find that value
    User.findOne({userName: req.body.username})
        .select('password')
        .select('email')
        .select('created')
        .select('userName')
        .select('userAbout')   //grab password of that username
        .exec(function(err,user){

        if (err){
            return next(err);
        } else if(!user) {
                console.log("APP.JS: user not found in session");
                res.sendStatus(401);
        } else {
        bcrypt.compare(req.body.password, user.password, function(err,valid) {
            if (err){ 
                return next(err);
            }
            // !valid means invalid name password combo - bcrypt asigns boolean
            else if(!valid){
                console.log("APP.JS: user found, but pwd not good");
                res.sendStatus(401);
            } else {
            //if valid then generate token based on user name
            //encode the incoming req.body.username with secretKey   
                var token = jwt.encode({username: req.body.username}, secretKey);
                console.log("APP.JS: user/pwd combo found and token is " + token);
                res.json({token:    token, 
                        userName:   user.userName, 
                        email:      user.email, 
                        userAbout:  user.userAbout, 
                        created:    user.created,
                        status: 200});   
            }           
        });
    };
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

        res.json(user.userName, user.email, user.userAbout);
        console.log("user.userName is " + user.userName);

    });
});


app.use('/api',router);  //this needs to be near bottom of page
 
    app.listen(3000);
    console.log('listening on port 3000!');