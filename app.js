//daybreak data model and mongolabs connection
var express = require('express');
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.use(function(req,res,next){
    console.log(" here on planet earth ");
    next();
})
 
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' }); 
});

router.route('/addday').post(function(req,res){
    res.json({"name":"Hello world world"});
    console.log("the request object" + req);

})

app.use('/api', router);


// //database connection
// var mongoose = require('mongoose');

// //local with local mongo db testing 
// var db = mongoose.connect('mongodb://localhost/daybreak');
 
// //local with remote mongolab DB
// //OR remote (heroku) with remote mongolabs DB
// try{
//     var uristring = require('../data/mongolabinfo.js').name;
//     //console.log("trying local mongolab string");
// }
// catch(err){
//     //console.log("no connection file so go on to Heroku config var");
//     var uristring = process.env.MONGOLAB_URI;   //if Heroku env
// }
// console.log("Either way: uristring is "+ uristring);

// var db = mongoose.connect(uristring);


//database schema for User and Day

// var User = db.model('user', 
// 	{   
//     username    :  String,
//     password    :  String,
//     email       :  String,
//     created     :  {type: Date},
//     userAbout   :  String
//     });

// var Day = db.model('day',
//     {
//     thetitle               : String,
//     username            : String,
//     recordCreationDate  : {type: Date},
//     recordUpdateDate    : {type: Date},
//     tripDate            : {type: Date},
//     description         : String,
//     demographic         : String,
//     tags                : String, 
//     locations           : Array
//     });

/* POST to Add User Service */

router.post('/api/addday', function(req, res) {
    var recordUpdateDate = Date.now();

    var newDayDoc = new Day({
        tripName: req.body.tripName,
        userName: req.body.userName,
        recordCreationDate: req.body.recordCreationDate,
        recordUpdateDate: req.body.recordUpdateDate,
        tripDate: req.body.tripDate,
        description: req.body.description,
        demographic: req.body.demographic,
        tags    : req.body.tags,
        locations: req.body.locations
        });
});

 
 

// router.post('/update', function(req,res){
//     console.log('request body id is '+ req.body.id);   
//     console.log('username is  '+ req.body.username);   
    
//     User.findOneAndUpdate(
//                 { _id: req.body.id}, 
//                 {$set: {
//                         _id         : req.body.id,
//                         postname    : req.body.postname,
//                         username    : req.body.username,
//                         email       : req.body.email,
//                         organization: req.body.organization,
//                         telephone   : req.body.telephone,
//                         postcontent : req.body.postcontent
//                 }}, 
//                 {upsert: false},

//                 function(err, docs){
//                      res.redirect('userlist');
//                     }
//                 );
//  });


// START THE SERVER
// =============================================================================
app.listen(3000, function(){
    console.log("Server listening on port 3000")
})


module.exports = router;
