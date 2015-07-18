var User = require('./user');   
var express = require('express'); 
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var token = jwt.encode({username: 'milesh'}, 'supersecretkey');
var _ = require('lodash');  //utility library for common tasks
var user = require('./user');
var secretKey = 'supersecretkey'
var bcrypt = require('bcrypt');

app.use(require('body-parser').json() );


//creates a new user and pwd combination and saves it 
app.post('/user', function(req,res,next){
	console.log("auth request to /user");
	var user = new User({username: req.body.username});
	console.log("user is " + user);

	bcrypt.hash(req.body.password, 10, function(err, hash){
		user.password = hash;
		console.log("user.password is  " + user.password);

		user.save(function(err,user){
			if (err){throw next (err)}
			console.log("send 201 response");	
			res.send(201);
		});
	});
});

//Takes user name and password hash stored client side, and 
//bcrypt compares incoming password to hash password in db
//If name pwd match, then returns a jwt token.
app.post('/session', function(req,res,next){
 	// Mongoose findOne method
 	// set username to incoming req.body.username and find that value
	User.findOne({username: req.body.username})
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
 
//decode jwt token to return username
//Takes the jwt token stored client side and returns the username
app.get('/user', function(req,res){
	var token = req.headers['x-auth'];
	var auth  = jwt.decode(token, secretKey);
	User.findOne({username: auth.username}, function(err,user){
		res.json(user);
	});
});

app.listen(3000);

