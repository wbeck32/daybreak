//userController

angular.module('dayBreak')
	.controller('userController', 
	['userService', '$scope', function(userService, $scope){

 	this.username  = userService.username;
  	this.userState = userService.userState;
  	this.userRegister = userService.userRegister; //mh
  	//this.dupeUsername = userService.dupeUsername;

	this.password 			= null;
  	this.email 				= null;
  	this.passwordConfirm 	= null;

  	this.showPasswordChange = false;
  	this.showDeleteAccount 	= false;

  	this.userViewSwitch 	= null;

  	//this.validateCtrl = null;

  	this.duplicateusername 	= true;  
  	//initialize as duplicate true - unique user choice falsifies
    this.duplicatemail 		= true;
	//initialize as duplicate true - unique user choice falsifies
 
 var updateScope = function() {
    this.username 	= userService.username;
    this.userState 	= userService.userState;
    this.password 			= null;
    this.email 				= null;
    this.passwordConfirm 	= null;
    this.newPassword 		= null;
    this.userViewSwitch 	= null;
    //this.validateCtrl		= null;
   

  }
  .bind(this);//TODO: understand why this is needed


// this.validateCtrl = function($scope){

// 	console.log("validateCtrl ***");
    
//     $scope.user = 'John Doe';
//     $scope.email = 'john.doe@gmail.com';
// };





// TEMP DELETE FINAL STEP

// this.registerValidUser = function() {
	
// 	console.log("registering... this.username" + this.username);
// 	console.log("this.password: " + this.password);
// 	console.log("this.passwordConfirm: " + this.passwordConfirm);
// 	console.log("this.email: " 	+ this.email);
	
// 	console.log("updateScope: " + updateScope);

// 	//userService.checkUsername(this.username);

//     userService.registerValidUser(this.username, this.password, this.email, updateScope);
//   };







this.login = function(){  

	console.log("logging in as ..." + this.username);
	console.log("this.password: " + this.password);
  
   	userService.login(this.username, this.password, updateScope);
	};

 

this.signOut = function(){
	console.log("calling signout...");
	this.userViewSwitch = null;
    userService.signOut();
    updateScope();
  };


// this.toggleLoginLogout = function(){
// 	userService.toggleLoginLogout();
// 	updateScope();
// };


this.checkUsername = function(){
	console.log("CONTROLLER: checking for unique user name...");
	userService.checkUsername(this.username);

	// if (this.username)
	// {
	// 	userService.checkUsername(this.username, duplicateUserName);
	// 	updateScope();
	// }
	// else
	// {
	//  	userService.duplicateUserName = null;
	//  	dpublicateUsername();	
	// }
};

this.checkEmail = function(){
	console.log("CONTROLLER: checking for unique email...");
	userService.checkEmail(this.email);

	// if (this.username)
	// {
	// 	userService.checkUsername(this.username, duplicateUserName);
	// 	updateScope();
	// }
	// else
	// {
	//  	userService.duplicateUserName = null;
	//  	dpublicateUsername();	
	// }
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
