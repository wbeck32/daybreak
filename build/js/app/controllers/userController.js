//userController
angular.module('dayBreak').controller('userController', 
	['$scope', '$http', function($scope, $http){
	
	console.log("begin - userController loaded");

this.registerUser = function(){

		console.log(this.username + " is this.username");
		console.log(this.email + " is this.email");

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

	console.log(this.username + " is this.username login ");

	$http({
		method: 'POST',
		url: '/session',
		data: {username: this.username, 
			   password: this.password 
			   },
		headers: {'Content-Type': 'application/json'}
		})
		.success(function(data, status, headers, config){
			console.log( "*** Valid name password combination ***");
			
		})
		.error(function(data,status, headers, config){
	 		console.log(" --- INVALID name password combination! --- ");
	});			 
};
 




this.resetPassword = function(){

};



}]);
