// //userController
// dayBreak.controller('userController', 
// 	['$scope','$http', 'userService', function($scope, $http, userService){

// 	this.email 			= null;
//     this.userAbout 		= null;
//     this.userName 		= null;

// 	this.LoginError 	= false;

//   	this.userViewSwitch = null;
//   	this.create 		= null;

//  	this.username  		= "";
//  	this.usernameLength = 5;  //set minimum usernameLength

//  	this.password 		= null;
//   	this.passwordConfirm= null; // note these are not equal to start
  	
//   	this.email 			= null;

//   	this.uniqueUserName = false;  //true stops error msg at start
//     this.uniqueEmail 	= false;
//  	this.matchingPassword= false;
// 	this.longUsername 	= false;
    
// 	newRegValuesAllGood = false;
     
//     this.userViewSwitch = null;
    
//   	this.userState 		= userService.userState;
//   	this.userRegister 	= userService.userRegister; //mh
 
//   	this.showPasswordChange = false;
//   	this.showDeleteAccount 	= false;


// var updateScope = function() {

//  	console.log("userController.js:  scope is updating");

//     this.username 			= userService.username;  //?
//     this.userState 			= userService.userState;  //?
//     this.userAbout			= userService.userAbout;
//     this.password 			= null;
//     this.email 				= userService.email;
//     this.create             = userService.create;
//     this.passwordConfirm 	= null;
//     this.newPassword 		= null;
//     this.userViewSwitch 	= userService.userViewSwitch;
//     this.LoginError			= userService.LoginError;

//     this.uniqueEmail		= null; 
//     this.uniqueUserName     = null;
 	
//     }
//  	.bind(this);//TODO: understand why this is needed


// //NOT IN USE 

// this.RegValuesAllGood=function(uniqueUserName, uniqueEmail, password, passwordConfirm){

// 	userService.RegValuesAllGood(uniqueUserName, uniqueEmail, password, passwordConfirm);

// };


// // this.newRegValuesAllGood = function(uniqueUserName, uniqueEmail, password, passwordConfirm){

// // console.log(" -------------------------- ");
// // console.log("this.uniqueUserName is: " 	+ this.uniqueUserName);
// // console.log("this.longUsername is: " + this.longUsername);
// // console.log(" ************************* ");
// // console.log("this.uniqueEmail is: " 	+ this.uniqueEmail);
// // console.log(" ************************* ");
// // console.log("this.password is: " 		+ this.password);
// // console.log("this.passwordConfirm is: " + this.passwordConfirm);
// // console.log("this.matchingPassowrd is: " + this.matchingPassword);
// // console.log(" ************************* ");
// // console.log("this.username is: " 		+ this.username);
// // console.log(" -------------------------- ");

// // 	if ( (this.password !== null) && (this.passwordConfirm !== null ))
// // 		{if (this.password === this.passwordConfirm)
// // 			{this.matchingPassword = true;}
// // 		}
	
// // 	if (this.username !== null){
// // 		if (this.username.length > 5)
// // 			{this.longUsername = true;}
// // 		else
// // 			{this.longUsername = false;}
// // 		}

// // //these conditions must be met to allow registration

// //   if( (this.uniqueUsername 		= true) &&
// //       (this.uniqueEmail 		= true) &&
// //       (this.matchingPassword 	= true) &&
// //       (this.longUsername	 	= true)     
// //     )
// //     {return true;  }
// //   	else
// //     {return false;}
// // };



// // this.RegValuesAllGood = function(uniqueUserName, uniqueEmail, password, passwordConfirm){

// // console.log(" -------------------------- ");
// // console.log("this.uniqueUserName is: " 	+ this.uniqueUserName);
// // console.log("this.uniqueEmail is: " 	+ this.uniqueEmail);
// // console.log("this.password is: " 		+ this.password);
// // console.log("this.passwordConfirm is: " + this.passwordConfirm);
// // console.log("this.username is: " 		+ this.username);
// // console.log(" -------------------------- ");

 
// //   if ( (this.uniqueUsername 	= true) &&
// //        (this.uniqueEmail 		= true)   &&
// //        (this.password 			=== this.passwordConfirm) &&
// //        (this.username.length 	> 5)     
// //      )
// //     {  return true;  }
// //   else
// //     {  return false;}
// // };



// this.checkthename = function(username){
//  	userService.checkthename(this.username);
// };

 
// this.checktheemail = function(email){
//     userService.checktheemail(this.email);
// };

 

// this.registerValidUser = function(username, password, email, cb){
// 	console.log("*******************************");
// 	console.log(this.username + " is username at registerUser");
// 	console.log(this.email    + " is email at registerUser   ");


	
// 	$http({
// 		method: 'POST',
// 		url: '/api/registerValidUser',
// 		data: {username    : this.username, 
// 			     password  : this.password,
// 			     email     : this.email},
// 		headers: {'Content-Type': 'application/json'}
// 		})
// 		.success(function(data, status, headers, config){
// 			console.log( "user created - data.username value is  " + data.username + " and status is " + status);
				
// 				$scope.User.userViewSwitch = null;  // on registering show nothing

// 		})
// 		.error(function(data,status, headers, config){
// 	 		console.log("no user created ");
// 	});	
// };

// this.resetPassword = function(username) {
//     $http({
//       method: 'POST',
//       url: '/api/passwordresetemail',
//       data: {
//         	username: this.username
//       		},
//       headers: {'Content-Type': 'application/json'}
//      })
//     .success(function(data, status, headers, config){
//       console.log('reset post successful');
//       alert('An email has been sent to your account, go check it out to proceed. You can close this window.');
//     })
//     .error(function(data, status, headers, config){
//       console.log('reset post failed: ' + data);
//     });
//   };
 

// this.login = function(){  
// 	console.log("######## logging in as ..." + this.username);
// 	console.log("########  this.password: " + this.password);
//     console.log("In controller first LoginError is: " + this.LoginError );
    
//     userService.login(this.username, this.password, updateScope);
//     // Important: Must pass update scope into service as a callback so that it is available to update scope after api calls return results.

// };

 
// this.signOut = function(){
// 	console.log("calling signout...");
	
// 	$scope.User.userViewSwitch = null;

//     userService.signOut();
//     //updateScope();

//      this.username 	= userService.username;  //?
//      this.userState = userService.userState;  //?
    
//      //this.userViewSwitch 	= 'Reg';

//      $scope.userTest = userService.userTest;
//      // $scope.$apply();
//   };

 
// }]);

//  