//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

///////////////////create connection
var mongoose = require('mongoose');
var db = mongoose.connection;
var uristring;

try{
    uristring = require('./data/mongolabinfo.js').name;
}
catch(err){
    console.log("no connection file so go on to Heroku/Other config var")
    uristring = process.env.MONGOLAB_URI;   //if Heroku env
}
//console.log("uristring is "+ uristring);

///////////////////create connection
mongoose.connect( uristring , function(){
    db.on('error', console.error.bind(console, 'connection error:')); 
    db.once('open', function(){
        console.log("Connected to MongoDB for Daybreak at Monglolabs.com");
    });
});

////define schema 
var daySchema = mongoose.Schema({
        date            : {type : Date, required : true, default : Date.now},
        title           : {type : String, required : true},
        username        : {type : String, required : true},
        recordCreationDate: {type : String, required : true},
        recordUpdateDate: {type : String, required : true},
        tripDate        : {type : String, required : true},
        description     : {type : String, required : true},
        demographic     : {type : String, required : true},
        tags            : {type : String, required : true}
});

////define model with name and schema
var Day = mongoose.model('Day', daySchema);
////////////////////////////////////////////////////////////

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.use(function(req, res, next) {
    // do logging
    //console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

/* GET home page. */
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to Daybreak API' });
});

/* POST to Add Trip Service */
router.route('/addday').post(function(req, res) {
    res.json({ message: 'Succesful post to /addday endpoint.' });
///console.log('req.title is ' + req.body.title); 

//assign req.body components to keys
    var day = new Day({
        "title": req.body.title,
        "username" : req.body.username,
        "recordCreationDate": req.body.recordCreationDate,
        "recordUpdateDate":  req.body.recordUpdateDate,
        "tripDate":  req.body.tripDate,
        "description": req.body.description, 
        "demographic": req.body.demographic,
        "tags"      : req.body.tags
        });

//save day -- Mongoose or monglabs creates collection "days" or automatically
//assigns an object to a collection with a plural version of its name(?)
    day.save(function(err, anythinghere){
        if(err){return console.error(err);}
        console.log('successful save to mongolab mongodb')
        res.status(201);
    });
});

 
app.use('/api',router);

//module.exports = router;
app.listen(3000);
console.log('listening on port 3000!');

