//userController

angular.module('dayBreak')
	.controller('userController', 
	['userService', function(userService){

 	this.username  = userService.username;
  	this.userState = userService.userState;
  	this.dupeUsername = userService.dupeUsername;

	this.password 			= null;
  	this.email 				= null;
  	this.passwordConfirm 	= null;

  	this.showPasswordChange = false;
  	this.showDeleteAccount 	= false;

 var updateScope = function() {
    this.username 	= userService.username;
    this.userState 	= userService.userState;
    this.password 			= null;
    this.email 				= null;
    this.passwordConfirm 	= null;
    this.newPassword 		= null;
  }
  .bind(this);//TODO: understand why this is needed


this.registerUser = function() {
	
	console.log("registering... this.username" + this.username);
	console.log("this.password: " + this.password);
	console.log("this.email: " 	+ this.email);
	console.log("updateScope: " + updateScope);

    userService.registerUser(this.username, this.password, this.email, updateScope);
  };


this.login = function(){  

	console.log("logging in as ..." + this.username);
	console.log("this.password: " + this.password);
  
   userService.login(this.username, this.password, updateScope);
	};


this.signOut = function(){
	
	console.log("calling signout...");

    userService.signOut();
    updateScope();
  };


}]);
/////////////////////////

// 	console.log("begin - userController loaded");


// if(window.localStorage.getItem('token')){
// 	this.username = window.localStorage.getItem('username');
// }


// this.registerUser = function(){

// 		console.log(this.username + " is this.username");
// 		console.log(this.email + " is this.email");

// 	$http({
// 		method: 'POST',
// 		url: '/user',
// 		data: {username: this.username, 
// 			   password: this.password, 
// 			   email   : this.email},
// 		headers: {'Content-Type': 'application/json'}
// 		})
// 		.success(function(data, status, headers, config){
// 			console.log( "user created and data is  " + data + status);

// 		}).error(function(data,status, headers, config){
// 	 		console.log("no user created ");
// 	});	
// };

 
// this.loginUser = function(){

// 	console.log(this.username + " is this.username login ");

// 	$http({
// 		method: 'POST',
// 		url: '/session',
// 		data: {username: this.username, 
// 			   password: this.password 
// 			   },
// 		headers: {'Content-Type': 'application/json'}
// 		})
// 		.success(function(data, status, headers, config){
// 			console.log( "*** Valid name password combination ***");
// 			console.log(data + " is data....");

// 			window.localStorage.setItem("token", data.token);
// 			window.localStorage.setItem("username", data.user);
			
// 			//this.username = user;

// 		})
// 		.error(function(data,status, headers, config){
// 	 		console.log(" --- INVALID name password combination ---");
// 		});			 
// };	

 

// this.showUser = function(){
// 	$http({
// 		method: 'GET',
// 		url: '/user',
// 		data: {}
// 	});
// }; 


// this.resetPassword = function(){
// };

 
// }]);
