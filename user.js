// db is auth_demo & collection is users

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/auth_demo', function(){
console.log('mongodb *auth_demo* connected');
});

var user = mongoose.Schema({
	username: String,
	password: String
});

module.exports = mongoose.model('User', user);
