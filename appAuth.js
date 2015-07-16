var express = require('express'); 
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var token = jwt.encode({username: 'milesh'}, 'supersecretkey');

var _ = require('lodash');  //utility library for common tasks

// var users = [{username: 'miles', 
// password: '$2a$10$V21ikVGhPu6705MQAmo/veUR9TyIQhLOUv6BJfJUvovEHluxJNLDS'}]  

var users = [{username: 'miles', 
password: 'pass'}]  


var secretKey = 'supersecretkey'

var bcrypt = require('bcrypt')

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
app.post('/session', function(req,res){
	var user = findUserByUsername(req.body.username);
	if (!validateUser(user, req.body.password)){
		return res.send(401);  //unauthorized - no password match
	}
	var token = jwt.encode({username: user.username}, secretKey);

	//if password match respond with token encoding name & pwd combo
	res.json(token);
});

app.get('/user', function(req,res){
	var token = req.headers['x-auth'];
	var user = jwt.decode(token, secretKey);
	//TODO: pull user info from database
	res.json(user);
});

app.listen(3000);

