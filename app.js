//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

/* GET home page. */
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

/* POST to Add Trip Service */
router.route('/addday').post(function(req, res) {
    res.json({ message: 'Bear created!' });
    console.log('req ',req); 
});

app.use('/api',router);

//module.exports = router;
app.listen(3000);
console.log('listening on port 3000!');

