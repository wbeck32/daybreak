//userController
dayBreak.controller('userController', 
	['$scope','$http', 'userService', function($scope, $http, userService){

 	this.username  = null;
 	this.usernameLength = 5;  //set minimum usernameLength
 	this.password 			= "";
  	this.passwordConfirm 	= null;//note these are not equal to start
  	this.email 				= null;

  	this.uniqueUserName = null;
    this.uniqueEmail = null;

  	this.userState = userService.userState;
  	this.userRegister = userService.userRegister; //mh
//  this.flag= userService.flag;   todo: delete this

  	this.showPasswordChange = false;
  	this.showDeleteAccount 	= false;

  	this.userViewSwitch 	= null;

 var updateScope = function() {
    this.username 	= userService.username;  //?
    this.userState 	= userService.userState;  //?
    this.password 			= null;
    this.email 				= null;
    this.passwordConfirm 	= null;
    this.newPassword 		= null;
    this.userViewSwitch 	= null;
    }
  	.bind(this);//TODO: understand why this is needed

$http.get('/api')
	.success(function(result){
		$scope.incoming = result;
	})
	.error(function(data, status){
		console.log(data);
	});
 
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
       		console.log("in controller uniqueUserName is: " + self.uniqueUserName);
	        $scope.User.uniqueUserName = self.uniqueUserName;
    	    console.log("$scope.User.uniqueUserName is: "+$scope.User.uniqueUserName);
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

this.resetPassword = function(username) {
    $http({
      method: 'POST',
      url: '/api/passwordresetemail',
      data: {
        	username: this.username
      		},
      headers: {'Content-Type': 'application/json'}
     })
    .success(function(data, status, headers, config){
      console.log('reset post successful');
      alert('An email has been sent to your account, go check it out to proceed. You can close this window.');
    })
    .error(function(data, status, headers, config){
      console.log('reset post failed: ' + data);
    });
  };

//userService

this.login = function(){  

	console.log("######## logging in as ..." + this.username);
	console.log("########  this.password: " + this.password);
  
   	userService.login(this.username, this.password, updateScope );
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


}]);





/////////////////////////

// 	console.log("begin - userController loaded");


// if(window.localStorage.getItem('token')){
// 	this.username = window.localStorage.getItem('username');
// }


 

 
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
