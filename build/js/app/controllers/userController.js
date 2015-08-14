//userController
dayBreak.controller('userController', 
	['$scope','$http', 'userService', function($scope, $http, userService){

	this.email = null;
    this.userAbout = "";
    this.userName = null;
    //this.userState = null;  //defined in service, not here.

	//this.LoginError = false;  //change to true on bad login attempt
	//$scope.LoginError = userService.LoginError;
	this.LoginError = false;

  	this.userViewSwitch 	= null;
  	this.create = null;

 	this.username  = "";
 	this.usernameLength = 5;  //set minimum usernameLength

 	this.password 			= "";
  	this.passwordConfirm 	= null; // note these are not equal to start
  	
  	this.email 				= null;

  	this.uniqueUserName = true;  //true stops error msg at start
    this.uniqueEmail = true;
	//$scope.userViewSwitch = null;
    

    //////////////////////////////////
    this.userViewSwitch = null;
    
 
 //   $scope.userTest= null;

  	this.userState = userService.userState;
  	this.userRegister = userService.userRegister; //mh
//  this.flag= userService.flag;   todo: delete this

  	this.showPasswordChange = false;
  	this.showDeleteAccount 	= false;


 var updateScope = function() {

 	console.log("userController.js:  scope is updating");

    this.username 			= userService.username;  //?
    this.userState 			= userService.userState;  //?
    this.userAbout			= userService.userAbout;
    this.password 			= null;
    this.email 				= userService.email;
    this.create             = userService.create;
    this.passwordConfirm 	= null;
    this.newPassword 		= null;
    this.userViewSwitch 	= userService.userViewSwitch;
    this.LoginError			= userService.LoginError;

    this.uniqueEmail		= userService.uniqueEmail;
    this.uniqueUserName     = userService.uniqueUserName;
 	
 	console.log("this.LoginError in updateScope is: " + this.LoginError);

    }
 	.bind(this);//TODO: understand why this is needed


// $http.get('/api')
// 	.success(function(result){
// 		$scope.incoming = result;
// 	})
// 	.error(function(data, status){
// 		console.log(data);
// 	});
 

// this.RegValuesAllGoodxxx=function(username, email, password, passwordConfirm){

// 	userService.RegValuesAllGood(uniqueUserName, uniqueEmail, password, passwordConfirm);

// };


this.RegValuesAllGood = function(uniqueUserName, uniqueEmail, password, passwordConfirm){
 
console.log("this.uniqueUserName is: " + this.uniqueUserName);
console.log("this.uniqueEmail is: " + this.uniqueEmail);
console.log("this.password is: " + this.password);
console.log("this.passwordConfirm is: " + this.passwordConfirm);
console.log("this.username is: " + this.username);


  if ( (uniqueUsername = true) &&
       (uniqueEmail = true)   &&
       (password === passwordConfirm) &&
       (this.username.length > 5)     )
    {  return true;  }
  else
    {  return false;}
};



this.checkthename = function(username){
 	userService.checkthename(this.username);
};

//NOTE this.username here, but when service DIFFERENT
//READY FOR DELETION
this.checkthenameXXX = function(username){

	 console.log("in controller sending to check:  " + this.username);


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

       		//can attach to $scope because in controller
	        $scope.User.uniqueUserName = self.uniqueUserName;
    	    
    	    console.log("$scope.User.uniqueUserName is: "+$scope.User.uniqueUserName);
     	})

		.error(function(data,status, headers, config){
        	console.log("data is: " + data);
    	});	
};

this.checktheemail = function(email){
    userService.checktheemail(this.email);
};


//READY FOR DELECTION
this.checktheemailXXX = function( email){
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
				
				$scope.User.userViewSwitch = null;  // on registering show nothing

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

// this.about = function(){
// 	console.log("calling user about");
// 	userService.about();
// };

this.login = function(){  
	console.log("######## logging in as ..." + this.username);
	console.log("########  this.password: " + this.password);
    console.log("In controller first LoginError is: " + this.LoginError );
    
    userService.login(this.username, this.password, updateScope);
    // Important: Must pass update scope into service as a callback so that it is available to update scope after api calls return results.

};

 
this.signOut = function(){
	console.log("calling signout...");
	
	$scope.User.userViewSwitch = null;

    userService.signOut();
    //updateScope();

     this.username 	= userService.username;  //?
     this.userState = userService.userState;  //?
    
     //this.userViewSwitch 	= 'Reg';

     $scope.userTest = userService.userTest;
     // $scope.$apply();
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
