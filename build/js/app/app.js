var dayBreak = angular.module('dayBreak',[], function(){
});


dayBreak.controller('newController', 
	['$scope', function($scope){

	$scope.message="************* hello ****************";
	console.log($scope);


}]);


dayBreak.controller('user2Controller',
		['$scope', '$http', 'userService', function($scope,$http,userService){


		// $scope.$apply();



		$scope.email 			= null;
		this.userAbout 			= null;
		this.LoginError 		= false;

		this.userViewSwitch 	= null;
		this.created 			= null;   //the created date

		this.username = null;
//		$scope.username  		= null;
		this.usernameLength 	= 5;  //set minimum usernameLength

		this.password = null;
		this.password = null;
		$scope.password 		= null;
		$scope.passwordConfirm	= null; // note these are not equal to start
				  	
 
		$scope.uniqueUserName 	= userService.uniqueUserName;  

		console.log("initialization of $scope.uniqueUserName is: " + $scope.uniqueUserName);

		//true stops error msg at start
		$scope.uniqueEmail 		= false;
		$scope.matchingPassword	= userService.matchingPassword;
		$scope.longUsername 	= userService.longUsername;


		$scope.User.uniqueUserName = userService.uniqueUserName;
		$scope.User.uniqueEmail 	=userService.uniqueEmail 
		$scope.User.matchingPassword = userService.matchingPassword; 
		$scope.User.longUsername	= userService.longUsername;


				    
		newRegValuesAllGood 	= false;
				     
		this.userViewSwitch 	= null;
				    
		this.userState 			= userService.userState;
		this.userRegister 		= userService.userRegister; //mh
				 
		this.showPasswordChange = false;
		this.showDeleteAccount 	= false;


	this.passconfirm = function(pass, passconfirm){
		console.log("password is : " + pass + "  passconfirm is: " + passconfirm);

		console.log("pass.length is" + pass.length);

		if ( (pass === passconfirm) 
			  && ( pass.length > 5) )
			{$scope.User.matchingPassword = true}
		else
			{$scope.User.matchingPassword = false}

  	};


	this.newRegValuesAllGood = function(User){

	console.log(" -------------------------- ");
	// console.log("this.uniqueUserName is: "  + userService.uniqueUserName);
	// console.log("this.longUsername is: " + self.longUsername);
	// console.log("this.uniqueEmail is: "   + self.uniqueEmail);
	// console.log("this.password is: "    + User.password);
	// console.log("this.passwordConfirm is: " + User.passwordConfirm);
	// console.log("this.matchingPassowrd is: " + self.matchingPassword);
	// console.log("User.username is: "    + User.username);
	// console.log("userservice.uniqueUsername is: "+userService.uniqueUserName);
	// console.log("User.uniqueUserName is: " + $scope.User.uniqueUserName);
	// console.log("User.uniqueEmail is: " + $scope.User.uniqueEmail);

	//SET INDEX PAGE SCOPE TO REFLECT UNIQUENESS OF NAME AND EMAIL.
	$scope.User.uniqueUserName = userService.uniqueUserName;
	$scope.User.uniqueEmail = userService.uniqueEmail;

	// console.log("$scope.User.uniqueUserName is: "+$scope.User.uniqueUserName );
	// console.log("$scope.User.uniqueEmail is: " + $scope.User.uniqueEmail);

	  if ( (User.password !== null) && (User.passwordConfirm !== null ))
	    {if (User.password === User.passwordConfirm)
	      {User.matchingPassword = true;}
	    }
	  
	  if ($scope.User.username !== null){
	    if ($scope.User.username.length > 5)
	      {$scope.User.longUsername = true;}
	    else
	      {$scope.longUsername = false;}
	    }

	//these conditions must be met to allow registration

	  if( (User.uniqueUserName   	 === true) &&
	      (User.uniqueEmail     	=== true) &&
	      (User.matchingPassword  === true) &&
	      (User.longUsername     === true)     
	    )
	    {
	    	console.log(User.uniqueUserName, User.uniqueEmail, User.matchingPassword, User.longUsername);
	        console.log ("Everything is good");
	        return true;  
	  	 }
	    else
	    {
	    	
	    	console.log(User.uniqueUserName, User.uniqueEmail, User.matchingPassword, User.longUsername);
	    	console.log ("Everything is NOT so good.");
	     	return false;
	    }

	};

			// this.newRegValuesAllGood(this.uniqueUserName, this.uniqueEmail, this.password, this.passwordConfirm);

		//this.newRegValuesAllGood();



		//////////////////////////////////////////////////////
		this.updateScope = function(){

			console.log("userController:  scope is updating");

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
		    this.uniqueEmail		= null; 
		    this.uniqueUserName     = null;	
	    }
 		.bind(this);//TODO: understand why this is needed


		//////////////////////////////////////////////////////
		//in userController
		this.login = function(){  

				console.log("######## logging in as ..." + this.username);
				console.log("######## this.password: " + this.password);
			    console.log("In controller first LoginError is: "+this.LoginError );
			    
			    userService.login(this.username, this.password, 
			    					this.updateScope);
 			    // Important: Must pass update scope into service as a callback so that it is available to update scope after api calls return results.
		};


		//////////////////////////////////////////////////////
		//in userController
 		this.signOut = function(){
				console.log("calling signout...");
				self.userViewSwitch = null;
			    userService.signOut(this.updateScope);
			    //updateScope();
			     //this.username 	= userService.username;  //?
			     //this.userState = userService.userState;  //?
			     //this.userViewSwitch 	= 'Reg';
			     //$scope.userTest = userService.userTest;
			     // $scope.$apply();
  			};


		//////////////////////////////////////////////////////
		this.registerValidUser = function(username, password, email, cb){
				console.log("*******************************");
				console.log($scope.username + " is username at registerUser");
				console.log($scope.email    + " is email at registerUser   ");
				
				$http({
					method: 'POST',
					url: '/api/registerValidUser',
					data: {username    : $scope.username, 
						     password  : $scope.password,
						     email     : $scope.email},
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


		//////////////////////////////////////////////////////
		this.checkthename = function(username){
 			userService.checkthename(this.username);
 			$scope.uniqueUserName = userService.uniqueUserName;  

 			};

		//////////////////////////////////////////////////////
		this.checktheemail = function(username){
 			userService.checktheemail(this.email);
			};



	}]);   //END OF user2Controller






















///moved inside user2Controller
dayBreak.controller('login',
		['$scope', '$http', 'userService', function($scope,$http, userService){

			this.login = function(){  

				console.log("######## logging in as ..." + this.username);
				console.log("########  this.password: " + this.password);
			    console.log("In controller first LoginError is: "+this.LoginError );
			    
			    userService.login(this.username, this.password);
			    // Important: Must pass update scope into service as a callback so that it is available to update scope after api calls return results.
		};
	}]);






angular.module('dayBreak') 
	.controller('updateScope',
		['$scope', '$http', 'userService', function($scope, $http, userService){

		$scope.updateScope = function(){
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
		    this.uniqueEmail		= null; 
		    this.uniqueUserName     = null;	
	    }
 		.bind(this);//TODO: understand why this is needed


	}]);


angular.module('dayBreak')
	.controller('checkthename',
		['$scope', '$http', function($scope,$http, userService){
			this.checkthename = function(username){
 			userService.checkthename(this.username);
			};
		}]);

angular.module('dayBreak')
	.controller('checktheemail',
		['$scope', '$http', function($scope,$http, userService){
			this.checktheemail = function(username){
 			userService.checktheemail(this.email);
			};
		}]);


angular.module('dayBreak')
	.controller('registerValidUser',
		['$scope', '$http', function($scope,$http, userService){

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
		}]);


dayBreak.controller('signout',
		['$scope', '$http', function($scope,$http, userService){
			 
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
		}]);


