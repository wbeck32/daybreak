var express = require('express'); 
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var mongoose = require('mongoose');
var moment = require('moment');

var jwt = require('jwt-simple');

//var token = jwt.encode({username: 'milesh'}, 'supersecretkey');
var token ='';

var _ = require('lodash');  
var secretKey = 'supersecretkey';
var jwtKey='supersecretkey';
var bcrypt = require('bcrypt');

var loginmailgun = require('./data/loginmailgun.js');
var transporter = nodemailer.createTransport(smtpTransport({
  host: 'smtp.mailgun.org',
  auth: {
    user: loginmailgun.user,
    pass: loginmailgun.pass
  }
}));

var path = require('path');  
 
//to support res.render 
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

 
app.use(favicon(__dirname + '/public/images/daybreaksun16px.ico'));
app.use(express.static(__dirname + '/public')); //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

try {var uristring = require('./data/mongolabinfo.js').loginstring;
    }
    catch(err){
    }   


var jwtKey = process.env.JWTKEY;
var jwtKey = secretKey;

var token = null;
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
    likesreceivedcount  :  String,
    activestatus        :  String,   //values null/activated/deactivated, eg. deleted
    deactivationDate    :  {type: Date}
    });

var Day = db.model('day',
    {
    dayName            : String,
    userName           : String,
    dayCreateDate      : {type: Date},
    dayUpdateDate      : {type: Date},
    dayDate            : {type: Date},
    dayDesc            : String,
    dayTags            : Array,
    dayChild           : Boolean,
    dayTeen            : Boolean,   
    locations          : Array,
    });

router.use(function(req, res, next) {
     next(); // make sure we go to the next routes and don't stop here
});

 
////////////////////////////////////////////////////////////////////
  
/* GET home page. */
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
    });
 

app.get('/api/show', function(req,res,next){
    var getSize = 50;
    Day.find( {} ).sort({dayCreateDate: 'descending'}).limit(getSize).exec(function(err, Days){
        if (err) 
            {return next(err)}
        else{
            console.log("we good at the api");
            res.status(201).json(Days); //returns saved Days object
            }
    })
});


//tag based search  
router.route('/taglookup').post(function(req,res,next){
        console.log ("at api incoming req.tag is... " + req.body.tag);
        tagString = req.body.tag;
        tagArray = tagString.split(",");

        Day.find({dayTags: {$in:tagArray}})
            .sort({dayCreateDate: 'descending'})
            .exec(function(err,Day)

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


//getdaysforuser  
router.route('/getdaysofuser').post(function(req,res,next){

        console.log ("at api incoming req.username is... " + req.body.username);
        
        Day.find( {userName : req.body.username}  )
            .sort({dayCreateDate: 'descending'})
            .exec(function(err,Day)
            
        {
        if (err)
            {console.log('error at getdaysforuser api endpoint');
             return next(err);}
        else
            {
            console.log("~~~~~~at getdaysforuser API found username...: ", Day );
            res.json(Day); 
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
        dayTeen:       req.body.dayTeen,
        dayChild:      req.body.dayChild, 
       dayTags:       req.body.dayTags,
        locations:     req.body.dayLocations
        
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
    var userCreateSuccess = false;
    //create user record
    var user = new User({   userName    : req.body.username,
                            created     : Date.now(),
                            email       : req.body.email,
                            userAbout   : "My perfect day would be...",
                            activestatus: "active"
                        });
    //asynchronous call of bcrypt
    bcrypt.hash(req.body.password, 10, function(err, hash) {    
    // Store hash in password DB.
        //console.log("BCRYPT password hash is " + hash);
        user.password = hash;//note definition of user.password in schema
        user.save(function(err){
            if (err){
                next(err);
            } else {
                userCreateSuccess = true;
            }
        });
    });

    //second register email 
    //console.log (req.body.email, " is registration email request");
    var expires = moment().add(1, 'days').valueOf();
    var token = jwt.encode({
        exp: expires,
        email: req.body.email
    }, jwtKey);

    var verifyEmailOptions = {
        from: 'PerfectDayBreak Team <hello@perfectdaybreak.com>', // sender address

        to: 'miles.hochstein@gmail.com,webeck@gmail.com',  //TODO DELETE OWN EMAIL!!!!! 

        subject: 'Please confirm your Perfect Daybreak email address', // Subject line
        text: 'Thanks for joining the Perfect Daybreak community. We promise we will not sell or share your e-mail address with anyone.', // plaintext body
        html: 'Thanks for joining the Perfect Daybreak community. We promise we will not sell or share your e-mail address with anyone. <br/><a href="http://localhost:8090/api/verifyemail?access_token='+token+'&email='+req.body.email+'">Click here to confirm your email address</a>.'
    };

    transporter.sendMail(verifyEmailOptions, function(err, info) {
        if (err) {
            console.log(err); 
        } else if(userCreateSuccess === true) {
            res.status(200).end();
        } 
    });
});


    
app.get('/api/verifyemail', function(req,res,next){
    //console.log(req._parsedOriginalUrl.query, " is access token for email verification response.");
    var queryString = req._parsedOriginalUrl.query;
    var q = queryString.split('=');
    var email = q[2];
    var token = q[1].split('&')[0];

    var emailVerified = checktokenvalid(token,email);
    if(emailVerified === true) {
        res.redirect('/');
    } else {
        res.status(404).end();
    }
    //IF incoming token = tokenized username plus email
    //THEN save username, encrypted password, created date and userAbout
    //THEN callback to allow user login

    
});


///////////////////////////////////////////////////////////
//user resets email

router.route('/emailreset').post(function(req,res,next){
    //var resetemail = req.body.newemail;//TODO USE THIS LINE WHEN LIVE
    var resetemail = 'miles.hochstein@gmail.com,webeck@gmail.com';  //TODO DELETE THIS LINE 
    var token = maketoken(req.body.username, req.body.newemail);  

    var verifyEmailOptions = {
              from: 'PerfectDayBreak Team <hello@perfectdaybreak.com>',
              to: resetemail,   
              subject: 'Please confirm your change of Perfect Daybreak email address', // Subject line
              text: 'Click this link to complete your email reset.', // plaintext body
              html: 'Click this link to complete your email reset.  <br/><a href="http://localhost:8090/api/verifyemailreset?'+token+'">Click here to confirm '+resetemail+' as the new registered email for PerfectDayBreak.com. </a><br/> To leave email unchanged just ignore this email.'
            };
    transporter.sendMail(verifyEmailOptions, function(err, info) {
              if (err) console.log(err);  
                    console.log('Email reset email sent!');
                    res.end('Email reset email sent!');
                  })
});

app.post('/api/userprofile', function(req, res, next){
    //console.log(req.body);
    var data = {user:'',days:''};
    User.find({userName: req.body.username}, function(err,user){

        console.log('user is: ', user);

        if (err){
            next();
        } else if (user && user[0].activestatus === 'active') {
            data.user = user[0];
            Day.find({userName : user[0].userName}, function(err, days) { 
                if (err) {
                    next();
                } else if(days) { 
                    data.days = days;
                } 
                console.log('api data is ', data);
                res.status(201).json(data);
            })        
        }
    }); 
});

app.get('/api/verifyemailreset', function(req,res,next){
    tokenIN=req._parsedOriginalUrl.query;
    var decoded = jwt.decode(tokenIN, jwtKey); //check for decoded.email
    var username = decoded.iss;
    var email = decoded.email;

    if (username){
        User.findOne({userName: username}, function(err, user){
            if (err) 
                { return next(err); }
            else
                {console.log ('no error on findOne');}
            user.email = email; 
            
            user.save(function(err) {
                if (err) { return next(err); }
                else {console.log('new user email saved to user.email');}
            });
        });
    }
 res.redirect('/');  //back to application
 });
 

//////////////////////////////////////////////////////
//Username password RECOVERY for loggedout user, 
//distinct from logged in user password reset
//THREE ENDPOINTS IN PROCESS 
/////////////////////////////////////////////////////////////////
 router.route('/passwordreset').post(function(req,res,next){
    
    var knownemail = req.body.knownemail;
    console.log('incoming pwd reset request for email: ', knownemail);
   
    if (knownemail){
        User.findOne({email: knownemail})
            .select('userName')
            .select('email')
            .exec(function(err, user){
            console.log('user is: ',user, ' and err is: ', err);

            if(user){      
                
                if (err){ 
                    console.log('some kind of error!');
                    return next(err); 
                    }
                if ( user.email===undefined )
                    {console.log(user.email, ' is email');
                    console.log('user submitted email not found in db');
                    return next(err);
                    }
                if (user.email === knownemail)  //only if knownemail found in db
                    { 
                    console.log('knownemail', knownemail, 'matched by db email of: ', user.email);
                    var expires = moment().add(1, 'days').valueOf();   
                    var token = jwt.encode({
                        exp: expires,
                        email: user.email
                      }, jwtKey);

                    var passwordResetOptions = {
                              from: 'PerfectDayBreak Team <passwordreset@perfectdaybreak.com>',
                              to: 'miles.hochstein@gmail.com,webeck@gmail.com',   
                              subject: 'Please click link to create new password', // Subject line
                              text: 'Click this link to create new password.', // plaintext body
                              html: 'Click this link to create a new password <br/><a href="http://localhost:8090/api/emailpasswordreset/'+token+'">Click here to create a new password for your account at PerfectDayBreak.com. </a><br/> If you did not request this e-mail, feel free to ignore it'
                            };
                    transporter.sendMail(passwordResetOptions, function(err, info) {
                              if (err) console.log(err);  
                                    console.log('Password reset email sent!');
                                    res.end('Password reset email sent!');
                                  })
                }
            }
        });
    }
});



/////////////////////////////////////////////////////////////////
app.get('/api/emailpasswordreset/:temptoken', function(req,res,next){

    console.log('GETTING PASSWORD RESET FORM AT /api/emailpasswordreset/:temptoken');
    var decoded = jwt.decode(req.params.temptoken, jwtKey); //check for decoded.email
    // var email   = decoded.email;
    // var expires = decoded.exp;
    res.redirect('/#/?modal=pwr&tkn='+req.params.temptoken);
  });

// after user fills out new password info, user posts to here
app.get('/api/verifypasswordreset/:temptoken/:pw/:pw2', function(req, res){
//  console.log('NOW POSTING NEW PASSWORD TO /api/verifypasswordreset/:temptoken');
  console.log( req.params.pw,req.params.pw2,' are incoming passwords');
//  check for valid token (good email and recent date)
    var pw = new Buffer(req.params.pw,'base64');
    var passwordreset = pw.toString();
    var pw2 = new Buffer(req.params.pw2,'base64');
    var passwordresetverify = pw2.toString();

    console.log(passwordreset,passwordresetverify);
    var decoded = jwt.decode(req.params.temptoken, jwtKey); //check for decoded.email
    var email   = decoded.email;
    var exp     = decoded.exp;
    var recentTokenValue = false;
    var equalPasswordsValue = false;
 
    recentToken(exp);
    equalPasswords(req.params.pw, req.params.pw2);
 
    function recentToken(exp){
        console.log('checking recentToken!');
         if (exp <= Date.now() ){
          res.end('Access token expired', 400);
         } else { 
            recentTokenValue= true;
             }
    };

    function equalPasswords(passwordreset, passwordresetverify){
        console.log('checking equalpasswords!');
        if (passwordreset !==  passwordresetverify)
             {res.end('Passwords did not match', 400);
             } else { 
                equalPasswordsValue = true; }
    };

    hashAndSave(recentTokenValue, equalPasswordsValue);

    function hashAndSave(recentTokenValue,equalPasswordsValue){  
    console.log('values are: ', recentTokenValue,equalPasswordsValue);     
    if (  recentToken && equalPasswords )
       {
        console.log('all three conditions for password reset are true');    
        bcrypt.hash(passwordreset, 10, function(err, hash) {    
            if (email){
                User.findOne({email: email}, function(err, user){
                    if (err) 
                        { return next(err); }
                    else
                        {console.log ('no error on findOne');}
                    //console.log(user.userName, ' is found at user');
                    user.password = hash; 
                    user.save(function(err) {
                        if (err) { return next(err); 
                        } else {
                            console.log('new hashed password saved to password');
                            res.redirect('/');
                            }
                        });
                    });
                }
        });

    } else  {
            console.log('all two conditions for reset NOT TRUE');    
            }
    }
});

 

/////////////////////////////////////////////////////////////////

router.route('/updateuserinfo').post(function(req,res,next){ 
    if (req.body.userName){
        User.findOne({userName: req.body.userName}, function(err, user){
            if (err) 
                { return next(err); }
            else
                {console.log ('no error on findOne');}
            user.userAbout = req.body.userAbout; 
            user.save(function(err) {
                if (err) { return next(err); }
                else {console.log('new userabout saved to userAbout');}
            });
        });
    }
})
 

router.route('/deleteaccountapi').post(function(req,res,next){
    //console.log(req.body.userAbout,"is req.body.userAbout incoming at API")
     console.log(req.body.username,"is req.body.userName incoming at API")
    if (req.body.username){
        User.findOne({userName: req.body.username}, function(err, user){
            if (err){ 
                return next(err); }
            else{
                console.log ('no error on findOne');
                user.activestatus='inactive'; 
                user.deactivationDate = Date.now();  //user metrics: how long before deactive?
                console.log("at save user.accountstatus is ", user.activestatus);
                user.save(function(err) {
                    if (err) { 
                        return next(err); }
                    else {
                        console.log('*** user.activestatus status changed to inactive');
                        res.status(201).json(user.activestatus); //returns saved day object
                        }
                })
            }
        });
    }
})



//1d  checks for duplicate username - If UNIQUE then TRUE
router.route('/checkusername').post(function(req,res,next){
    var user = new User({userName: req.body.username });
   User.findOne({userName: req.body.username})
        .select('userName') 
        .exec(function(err,user){                     
                if (err){
                    console.log("error in mongoose findOne");
                    return next(err);
                    }
                if(user === null){ console.log('this is a unique user');
                    res.send(true);  //hooray found a unique username!
                    }
                else{
                    res.send(false);  //sorry username already exists
                }            
         });
  });


//1d  checks for duplicate email
router.route('/checkemail').post(function(req,res,next){
 
    var user = new User({email: req.body.email });
   
    User.findOne({email: req.body.email})
        .exec(function(err,user){
                console.log(user+  " is user at checkemail route");
                if (err){
                    next(err);
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
router.route('/login').post(function(req,res,next){
    console.log('session: ',req.body.username);
    User.findOne({userName: req.body.username})
        .select('password').select('email').select('created').select('userName')
        .select('userAbout').select('activestatus').exec(function(err,user){

        console.log(user.activestatus, ' is user.activestatus at login api');

        if (err){
            return next(err);
        } else if(!user) {
                console.log("APP.JS: user not found at login api");
                res.sendStatus(401);
//TODO: use this flag to activate after email confirm, and deactivate on user request.
        } else if (user.activestatus==='inactive') {
                console.log("username exists but account status is inactive at login api");
                res.sendStatus(401);
        } else {
        bcrypt.compare(req.body.password, user.password, function(err,valid) {
            if (err){ 
                return next(err);
            }
            // !valid means invalid name password combo - bcrypt asigns boolean
            else if(!valid){
                console.log("user found, but pwd not good at login api");
                res.sendStatus(401);
            } else {            
            var token = maketoken(req.body.username, user.email);
            console.log("APP.JS: user/pwd combo found and token is " + token);

            res.json({      token:      token, 
                            userName:   user.userName, 
                            email:      user.email, 
                            userAbout:  user.userAbout, 
                            created:    user.created,
                            status:     200});   
                }           
        });
        };
    });
});


function maketoken (username, email){
  var expires = moment().add(7, 'days').valueOf();  //about 6 minutes?
  var token = jwt.encode({
    iss: username,
    exp: expires,
    email: email
  }, jwtKey);

  console.log('start with ', username, expires,  email, ' to make token ', token);
  return token;
}



//similar to login - login via username but use stored token for returning user.
router.route('/loginrefresh').post(function(req,res,next){
    
    console.log('loginrefresh incoming username: ',req.body.username);
    console.log('loginrefresh incoming token: '   ,req.body.token);

    var username = jwt.decode(req.body.token, jwtKey).iss;

    console.log('loginrefresh incoming token: '   ,username);

    //console.log('here is user name inside token at app.js', username); 

    User.findOne({userName: username})
        .select('email').select('created').select('userName')
        .select('userAbout').select('activestatus').exec(function(err,user){

        console.log('HEY FOUND THE EMAILFOR THIS USER at loginrefresh', user.email);

        var verifiedemail = user.email;

        if (err){
            return next(err);
        } else if(!user) {
                console.log("APP.JS: user not found in session");
                res.sendStatus(401);
//TODO: use this flag to activate after email confirm, and deactivate on user request.
        } else if (user.activestatus==='inactive') {
                console.log("username exists but account status is delete");
                res.sendStatus(401);
        } else {
//the email is the registered email used to set the token 
            var tokenresult = checktokenvalid(req.body.token, verifiedemail);
            console.log('checktokenvalid() gives tokenresult of: ', tokenresult);
            console.log('for sending to client: ', user.userName, user.email, user.userAbout, user.created);
        
            if(tokenresult===true){
            res.json({      token:      token,
                            userName:   user.userName, 
                            email:      user.email, 
                            userAbout:  user.userAbout, 
                            created:    user.created,
                            status:     200});
                }
//the email is not the registered email used to set the token
            else if (tokenresult!==true){
                console.log ('no valid token at api on loginrefresh');
        }
        }           
    });
});

//////////////////////////////////////////////////////
//logged in user changes password

router.route('/changepassword').post(function(req,res,next){ 

    console.log('incoming is: ', req.body.username, req.body.password);
    if (req.body.password){
        User.findOne({userName: req.body.username}, function(err, user){

            console.log(err,' is err', user, ' is user');

            if (err) 
                {  
                console.log('  findOne error');  
                next(err);
                }
            else
                {console.log ('no error on findOne');

                  if (user){

                    console.log( '  at changepassword, matching: ', req.body.username);
                    bcrypt.hash(req.body.password, 10, function(err, hash) { 
                        user.password = hash;
                        user.save(function(err, next) {
                            if (err) 
                                { console.log ('error on changepassword');
                                  res.sendStatus(404);
                                  next(err);
                                }
                            else 
                                { console.log('new password saved for user');
                                res.sendStatus(200);
                                }
                        });
                    });

                  }
                  else{
                     console.log('no user found ********');
                  }
                }

        })
    }
 })


 //////////////////////////////////////////////////////
router.route('/auth').post(function(req,res,next){

    console.log(req.body.username, ' is incoming username');
    console.log(req.body.token,    ' is incoming token at api');


});



/////////roadwarrior

function authenticate (userid, email){
  var expires = moment().add(7, 'days').valueOf();
  var token = jwt.encode({
    iss: userid,
    exp: expires,
    email: email
  }, jwtKey);
  return token;
}


function passwordResetAuthenticate (userid){
  var expires = moment().add(1, 'hours').valueOf();
  var token = jwt.encode({
    iss: userid,
    exp: expires
  }, jwtKey);
  return token;
}

//look up user by plain text username - 
//IF positive match on decoded email and recent date
//return true
//else return false

function checktokenvalid(tokenIN, verifiedemail){
    if (tokenIN) {
            var decoded = jwt.decode(tokenIN, jwtKey); 
            console.log('decoded ' ,decoded);//check for decoded.email
            //console.log('values are: ', decoded.iss, decoded.exp, decoded.email);
            if (decoded.exp <= Date.now() ) {
                res.end('Access token expired', 404);
                next(err); 
                }
            else if(decoded.email = verifiedemail){
                //console.log('decoded token email matches stored email.');
                tokenresult = true;
                return tokenresult;
                }
    }
}

app.use('/api',router);  //this needs to be near bottom of page
 
app.listen(8090);
console.log('listening on port 8090!');