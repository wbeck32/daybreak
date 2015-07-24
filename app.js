var express = require('express'); 
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var jwt = require('jwt-simple');
var token = jwt.encode({username: 'milesh'}, 'supersecretkey');
var _ = require('lodash');  //utility library for common tasks
var secretKey = 'supersecretkey';
var bcrypt = require('bcrypt');

app.use(favicon(__dirname + '/public/images/daybreaksun16px.ico'));
app.use(express.static(__dirname + '/public')); //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//database connection
var mongoose = require('mongoose');

 try {
    var uristring = require('./data/mongolabinfo.js').loginstring;
    }
catch(err){
    }   

var db = mongoose.connect(uristring);

var User = db.model('user', 
    {   
    userName    :  String,
    password    :  String,
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

/*\GET home page. */
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.get('/api/show', function(req,res,next){
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


// //SERVES AN HTML PAGE, NEXT ONE IS API ENDPOINT SERVING JSON
// app.get('/show', function(req,res,next){
//     Day.find(function(err, Days){
//         if (err) 
//             {return next(err)}
//         else
//             {
//             //res.json({message: ' that worked '})  return success message
//             //console.log("we good");
//             res.sendFile(__dirname + '/public/show.html')  //returns show.html
//             }
//     })
//  })

//SERVES A JSON OBJECT
// app.get('/api/show', function(req,res,next){
//     Day.find(function(err, Days){
//         if (err) 
//             {return next(err)}
//         else
//             {
//             console.log("we good at the api" + Days);
//             res.status(201).json(Days); //returns saved Days object
//             }
//     })
// })


app.use('/api',router);

app.listen(3000);
console.log('listening on port 3000!');

 
