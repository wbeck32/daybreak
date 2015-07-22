//userController (was loginController)
angular.module('dayBreak').controller('userController', 
	['$scope', '$http', function($scope, $http){
	
	console.log("begin - userController loaded");

this.registerUser = function(){

	console.log(this.username + " is this.username");

	$http({
		method: 'POST',
		url: '/user',
		data: {username: this.username, 
			   password: this.password, 
			   email: this.email},
		headers: {'Content-Type': 'application/json'}
		})
		.success(function(data, status, headers, config){
			console.log( "user created and data is  " + data + status);

		}).error(function(data,status, headers, config){
	 		console.log("no user created ");
	});
};

 
this.loginUser = function(){
	$http({
		method: 'GET',
		url: '/user',
		token: 'x-auth',
		auth: jwt.decode(token, secretKey)
		})
		.User.findOne({userName: auth.username}, function(err,user){
        res.json(user);})
	};

//original code
// app.get('/user', function(req,res){
//     var token = req.headers['x-auth'];
//     var auth  = jwt.decode(token, secretKey);
//     User.findOne({userName: auth.username}, function(err,user){
//         res.json(user);
//     });
// });
//original code
 


this.resetPassword = function(){

};



}]);
