// db is auth_demo & collection is users

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/auth_demo', function(){
console.log('mongodb *auth_demo* connected');
});

var user = mongoose.Schema({
	username: {type: String, select: true},
	password: {type: String, select: false} 
	//select: false ... to block send of full user object to client
});

module.exports = mongoose.model('User', user);
