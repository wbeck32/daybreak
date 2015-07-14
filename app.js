var express = require('express'); 
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public')); //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api',router);  //move this from bottom to here

//database connection
var mongoose = require('mongoose');

//local with local mongo db testing 
// var db = mongoose.connect('mongodb://localhost/daybreak');
 
try {
    var uristring = require('./data/mongolabinfo.js').loginstring;
    console.log("trying local mongolab string" + uristring);
    }
catch(err){
    //console.log("no connection file so go on to Heroku config var");
    //var uristring = process.env.MONGOLAB_URI;   //if Heroku env
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
    tripName            : String,
    userName            : String,
    tripCreateDate      : {type: Date},
    tripUpdateDate      : {type: Date},
    tripDate            : {type: Date},
    tripDesc            : String,
    tripGroup           : String,
    tags                : Array, 
    locations           : Array
    });

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

/* GET home page. */
    // router.get('/', function(req, res) {
    //   res.json({ message: 'hooray! welcome to our api!' });
    // });

app.get('/show', function(req,res,next){
    Day.find(function(err, Days){
        if (err) 
            {return next(err)}
        else
            {
            //res.json({message: ' that worked '})  return success message
            console.log("we good");
            console.log(Days[30]);
            res.status(201).json(Days); //returns saved Days object
            //res.sendFile(__dirname + '/public/show.html')  //returns show.html
            }
    })

    //res.sendFile(__dirname + '/public/show.html')
    //res.json({ message: 'hooray! welcome to our api!' });
})

/* GET home page. */
// router.get('/show', function(req, res, next) {
//    //console.log('SHOW is happening.');
//    res.json({ message: 'here will be a list of trips' });

//     res.sendFile('./show.html');

// });


/* POST to Add Trip Service */
router.route('/addday').post(function(req, res) {

    var newDayDoc = new Day({
        tripName: req.body.tripName,
        userName: req.body.userName,
        tripCreateDate: req.body.tripCreateDate,
        tripUpdateDate: Date.now(),
        tripDate: req.body.tripDate,
        tripDesc: req.body.tripDesc,
        tripGroup: req.body.tripGroup,
        tags    : req.body.tags,
        locations: req.body.locations
        });

    newDayDoc.save(function(err, newDayDoc){
        if (err) {
            return console.error(err);
            }
        res.status(201).json(newDayDoc); //returns saved day object
     })
  });


//module.exports = router;
app.listen(3000);
console.log('listening on port 3000!');

 
