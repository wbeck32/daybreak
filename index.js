var express = require('express');
var router = express.Router();

//database connection
var mongoose = require('mongoose');

//local with local mongo db testing 
//var db = mongoose.connect('mongodb://localhost/nodecrud');
 
//local with remote mongolab DB
//OR remote (heroku) with remote mongolabs DB
try{
    var uristring = require('../data/mongolabinfo.js').name;
    //console.log("trying local mongolab string");
}
catch(err){
    //console.log("no connection file so go on to Heroku config var");
    var uristring = process.env.MONGOLAB_URI;   //if Heroku env
}
console.log("Either way: uristring is "+ uristring);

var db = mongoose.connect(uristring);

//database schema for User and Day

var User = db.model('user', 
	{   
    username    :  String,
    password    :  String,
    email       :  String,
    created     :  {type: Date},
    userAbout   :  String
    });

var Day = db.model('day',
    {
    title               : String,
    username            : String,
    recordCreationDate  : {type: Date},
    recordUpdateDate    : {type: Date},
    tripDate            : {type: Date},
    description         : String,
    demographic         : String,
    tags                : String, 
    locations           : Array
    });


/* POST to Add User Service */
router.post('/addday', function(req, res) {

    var date = Date.now();
    //console.log(date + " is the current date");

    var newDayDoc = new Day({
        postname: req.body.postname,
        username: req.body.username,
        email: req.body.email,
        organization: req.body.organization,
        telephone: req.body.telephone,
        postcontent: req.body.postcontent,
        date: date 
        });

    console.log(NewUserDoc);
    NewUserDoc.save(function(err, callback){
        res.redirect('/thankyou');
    });

});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Suggestion Module' });
});

router.get('/thankyou', function(req, res, next) {
  res.render('thankyou', { title: 'Thank You for Your Message' });
});


/* GET About page. */
router.get('/about', function(req, res) {
    res.render('about', { title: 'Suggestion Module' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    User.find( {} , function(err,docs){
        docs.reverse();   //reverse the array before handing to client
        docs = docs.slice(0,10);

        res.render('userlist', {'userlist':docs});
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});





router.get('/deleteuser/:id', function(req, res){
    console.log(req.params.id);
    User.remove({_id: req.params.id }, function(){
           res.redirect('/userlist');
    });
});

router.get('/singleview/:id', function(req,res){
     User.find({_id: req.params.id}, function(err, docs){
        console.log(docs);
        res.render('singleview.jade', {user : docs});
    });
});


router.get('/edituser/:id', function(req,res){
     User.find({_id: req.params.id}, function(err, docs){
        console.log(docs);
        res.render('edituser.jade', {user : docs});
    });
});

router.post('/update', function(req,res){
    console.log('request body id is '+ req.body.id);   
    console.log('username is  '+ req.body.username);   
    
    User.findOneAndUpdate(
                { _id: req.body.id}, 
                {$set: {
                        _id         : req.body.id,
                        postname    : req.body.postname,
                        username    : req.body.username,
                        email       : req.body.email,
                        organization: req.body.organization,
                        telephone   : req.body.telephone,
                        postcontent : req.body.postcontent
                }}, 
                {upsert: false},

                function(err, docs){
                     res.redirect('userlist');
                    }
                );
 });




module.exports = router;
