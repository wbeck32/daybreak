//login controller
angular.module('dayBreak')
.controller('loginController', ['$scope', '$http', function($scope, $http){

this.adduser = function(){
	
	console.log(this.username + " is this.username");
	// $http({
	// 	method: 'POST',
	// 	url: '/user',
	// 	data: {username: this.username, 
	// 		   password: this.password, 
	// 		   email: this.email},
	// 	headers: {'Content-Type': 'application/json'}
	// 	})
	// 	.success(function(data, status, headers, config){
	// 		console.log( "user created and data is  " + data + status);

	// 	}).error(function(data,status, headers, config){
	//  		console.log("no user created ");
	// });
};	 
}]);
