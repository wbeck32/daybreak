//userController

dayBreak.controller('userController', 
	['$scope','$http', 'userService', function($scope, $http, userService){

 	this.username  = userService.username;
 	this.usernameLength = 5;  //set minimum usernameLength

  	this.userState = userService.userState;

  	this.userRegister = userService.userRegister; //mh
  	this.flag= userService.flag;
  	//this.dupeUsername = userService.dupeUsername;

 	this.password 			= "";
  	this.passwordConfirm 	= null;//note these are not equal to start

  	this.email 				= null;


  	this.showPasswordChange = false;
  	this.showDeleteAccount 	= false;

  	this.userViewSwitch 	= null;
 
  	this.uniqueUserName = null;
    this.uniqueEmail = null;



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



$http.get('/api')
	.success(function(result){

		$scope.incoming = result;

	})
	.error(function(data, status){

		console.log(data);

	});


 
//defunct
// this.checkUsername = function(){
// 	console.log("CONTROLLER: checking for unique user name...");

// 	console.log("in controller uniqueUserName STARTS : " + self.uniqueUserName); 

// 	var result = userService.checkthename(this.username);
// 	console.log("in controller uniqueUserName ENDS : " + self.uniqueUserName); 
	
// };

//active
this.checkthename = function( username, cb){
    $http({
		method    : 'POST',
		url       : '/api/checkusername',
		data      : {username       : this.username},
		headers   : {'Content-Type' : 'application/json'}
		})
		.success(function(res){
        	console.log("res is:  " + JSON.parse(res ) );
       		self.uniqueUserName =  JSON.parse(res ) ;
       		console.log("in controller the uniqueUserName is : " + self.uniqueUserName);

	        $scope.User.uniqueUserName = self.uniqueUserName;
	        //$scope.uniqueUserName = self.uniqueUserName;
	        
    	    //console.log("$scope.uniqueUserName is : " + $scope.uniqueUserName);
    	    console.log("$scope.User.uniqueUserName is : " + $scope.User.uniqueUserName);
     	})
		.error(function(data,status, headers, config){
        	console.log("data is: " + data);
    	});	
};

this.checktheemail = function( email, cb){
    $http({
		method    : 'POST',
		url       : '/api/checkemail',
		data      : { email       : this.email},
		headers   : {'Content-Type' : 'application/json'}
		})
		.success(function(res){
        	console.log("res is:  " + JSON.parse(res ) );
       		self.uniqueEmail =  JSON.parse(res ) ;
       		console.log("in controller the uniqueEmail is : " + self.uniqueEmail);

	        $scope.User.uniqueEmail = self.uniqueEmail;
	      
    	    console.log("$scope.User.uniqueEmail is : " + $scope.User.uniqueEmail);
     	})
		.error(function(data,status, headers, config){
        	console.log("data is: " + data);
    	});	
};


this.registerValidUser = function(username, password, email, cb){
	console.log("*******************************");
	console.log(this.username + " is username at registerUser");
	console.log(this.email    + " is email at registerUser   ");

	$http({
		method: 'POST',
		url: '/api/registerValidUser',
		data: {username    : this.username, 
			     password  : this.password,
			     email     : this.email},
		headers: {'Content-Type': 'application/json'}
		})
		.success(function(data, status, headers, config){

			console.log( "user created - data.username value is  " + data.username + " and status is " + status);

			 
		})
		.error(function(data,status, headers, config){
	 		console.log("no user created ");
	});	
};




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

//defunct
// this.checktheemail = function(email, cb){
//  	// console.log(email + " is email at registerUser SERVICE  ");
// 	$http({
// 		method: 'POST',
// 		url: '/api/checkemail',
// 		data: {email : email},
// 		headers: {'Content-Type': 'application/json'}
// 		})
// 		.success(function(data, status, headers, config){
// 		})
// 		.error(function(data,status, headers, config){		
// 	 	// console.log("no user created at SERVICE checkEmail ");
// 	});	
// };




//inactive
// this.checkEmail = function(){
// 	console.log("CONTROLLER: checking for unique email...");
// 	userService.checkEmail(this.email);

// 	// if (this.username)
// 	// {
// 	// 	userService.checkUsername(this.username, duplicateUserName);
// 	// 	updateScope();
// 	// }
// 	// else
// 	// {
// 	//  	userService.duplicateUserName = null;
// 	//  	dpublicateUsername();	
// 	// }
// };

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
