var User = require('./user');   
var express = require('express'); 
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var token = jwt.encode({username: 'milesh'}, 'supersecretkey');
var _ = require('lodash');  //utility library for common tasks
var user = require('./user');

var users = [{username: 'miles', 
password: '$2a$10$V21ikVGhPu6705MQAmo/veUR9TyIQhLOUv6BJfJUvovEHluxJNLDS'}]  

var users = [{username: 'miles', 
password: 'pass'}]  


var secretKey = 'supersecretkey'

var bcrypt = require('bcrypt');



//Works but is not asynchronous, slows things down
function validateUser(user, passowrd){
	return bcrypt.compareSync(password, user.password);
};

app.use(require('body-parser').json() );

//find in users the user with username
function findUserByUsername(username){ 
	return _.find(users,{username:username});
};

//return true if input password matches password of found user
function validateUser(user,password){
	return user.password === password;
};

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

app.post('/session', function(req,res,next){
 	//look up user with Mongoose findOne method
	User.findOne({username: req.body.username}, function(err,user){
		if (err){return next(err)}
		if(!user){return res.send(401)}
		console.log('USER NAME FOUND');
		//if user is found check incoming pwd against stored pwd
		console.log(req.body.password + " is req.body.password");
		console.log(user.password + " is user.password");	
// 		bcrypt.compare(req.body.password, user.pasword, function(err,valid){
		bcrypt.compare('pass', '$2a$10$BzG0aHbvxVaDz1YB.J1b4.Cz7VO0MIpexSniwd49VhwT0Rfc.4sdW', function(err,valid){
			if (err){return next(err)};
			if(!valid){return res.send(401)};

			//if pwd exists generate token based on user name	
			var token = jwt.encode({username: user.username}, secretKey);
			console.log("user/pwd combo found and token is " + token);
			res.json(token);
		});
	});
}); 

//VERSION 2
// app.post('/session', function(req,res){
// 	console.log('login request made');
// 	var user = findUserByUsername(req.body.username);  //find
// 	console.log(user + " is user")
// 	validateUser(user, req.body.password, function(err, valid){
// 		if(err || !valid){return res.send(401)}
// 		var token = jwt.encode({username: user.username}, secretKey);
// 		res.json(token)	
// 	})
// });

//VERSION WITH NO PASSWORD HASHING
// app.post('/session', function(req,res){
// 	var user = findUserByUsername(req.body.username);
// 	if (!validateUser(user, req.body.password)){
// 		return res.send(401);  //unauthorized - no password match
// 	}
// 	var token = jwt.encode({username: user.username}, secretKey);

// 	//if password match respond with token encoding name & pwd combo
// 	res.json(token);
// });

app.get('/user', function(req,res){
	var token = req.headers['x-auth'];
	var auth = jwt.decode(token, secretKey);
	User.findOne({username: auth.username}, function(err,user){
		res.json(user);
	});
});


// app.get('/user', function(req,res){
// 	var token = req.headers['x-auth'];
// 	var user = jwt.decode(token, secretKey);
// 	//TODO: pull user info from database
// 	res.json(user);
// });

app.listen(3000);

