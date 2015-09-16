dayBreak.controller('userController',
		['$scope', '$rootScope','$http', 'userService', function($scope,$rootscope, $http,userService){
		
		$scope.User.userFormView 	= 'hide';  //can change to 'show'  		
 		$scope.User.userDayView 	= 'grid';  //user can change to 'single'
 		$scope.User.userViewSwitch 	= null;
 		$scope.User.password 		= null;
		$scope.User.passwordConfirm	= null; 
		$scope.User.email 			= null;
		//$scope.User.created 		= Date;	//not necessary
		$scope.User.userAbout 		= null;
 		$scope.User.uniqueEmail 	= '';  // email is unique in database
		$scope.matchingPassword		= '';
 		$scope.User.uniqueUserName 	= '';
		$scope.User.longUsername	= false;
		$scope.User.validPassword 	= false; 
 		$scope.User.LoginError 		= false;	     
		$scope.User.username 		= userService.username;	    
		$scope.User.userState 		= userService.userState;
 
 
//////////////////////////////////////////////////////

	this.init = function(){
		//check for recent token 
			// if token x`x``


	};


	//on keyup test password for match and other criteria.
	this.passconfirm = function(pass, passconfirm){

	if(pass && passconfirm){
	  	if  (pass === passconfirm && pass.length > 4) {
	  	    $scope.User.validPassword = true;
	    } else {
	      	$scope.User.validPassword = false;
	    	}
	    if(pass === passconfirm) {
	      	$scope.User.matchingPassword = true;
	    } else {
	      	$scope.User.matchingPassword = false;
	    }
	  }
	};

//////////////////////////////////////////////////////

	this.newRegValuesAllGood = function(User){
	  
		  if ($scope.User.username !== null){ 
		    	if ($scope.User.username.length > 5)
		      	{$scope.User.longUsername = true;
		    	} else {
		    	$scope.User.longUsername = false;}
		    }

		   //these conditions must be met to allow registration
		  if( ($scope.User.uniqueUserName   	=== true) &&
		      ($scope.User.uniqueEmail     		=== true) &&
		      ($scope.User.validPassword  		=== true) &&
		      ($scope.User.longUsername     	=== true)     
		    )
		    {	console.log($scope.User.uniqueUserName, $scope.User.uniqueEmail, $scope.User.validPassword, $scope.User.longUsername);
		     	console.log ("Login requirements all good");
		     	return true;  
		  	 }else{
		 		console.log($scope.User.uniqueUserName, $scope.User.uniqueEmail, $scope.User.validPassword, $scope.User.longUsername);
		    	console.log ("Login requirements NOT met.");
		     	return false;
		    }
		};

//////////////////////////////////////////////////////
//loginState REQUIRES 200 RESPONSE
//COULD ADD loginState depends on recent token
//callback function for login


    function loginState(status) {

	    if(status.status === 200) {

    	console.log("loginState 1 setting $scope.User.userState at loginState()", $scope.User.userState );
    	console.log("loginState 1a setting $scope.User.username at loginState()", $scope.User.username );

		$scope.User.userState = 'loggedIn';
	    $scope.User.userViewSwitch = null;
		$scope.User.email = status.email;
		$scope.User.username = status.userName;
		$scope.User.userAbout = status.userAbout;
		//remove time of account creation for public presentation
		//format: {"$date": "2015-08-20T18:37:47.626Z"}
		$scope.User.created = status.created.substring(0,10);
		
    	console.log("loginState 2 setting $scope.User.userState at loginState()", $scope.User.userState );
		console.log("loginState 2a setting $scope.User.username at loginState()", $scope.User.username );

	    } else {
	    	//  $scope.User.userFormView='hide';
		      $scope.User.userState = 'loggedOut';
		      //$rootscope.User.userState = 'loggedOut'

		      $scope.User.LoginError = true;           
		      $scope.User.userViewSwitch = 'Log';
		      $scope.User.password = '';
		      $scope.User.username = '';
		    }
	    }


	this.login = function(){  
	  $scope.User.LoginError = false; //stops persistence of error message after bad login attempt
      userService.login(this.username, this.password, loginState);
		};


//////////////////////////////////////////////////////
//signout callback
//////////////////////////////////////////////////////
    function changeUserState(){
     	$scope.User.userState = 'loggedOut';
      	$scope.User.userViewSwitch = null;
      	//below important for clearing reg form if user returns to it
      	$scope.User.username 		= null;
		$scope.User.password 		= null;
		$scope.User.passwordConfirm	= null; // note these are not equal to start
		$scope.User.email 			= null;
		$scope.User.matchingPassword= null;
		$scope.User.uniqueEmail		= '';   //important, not false or null
	    }

//////////////////////////////////////////////////////

 	this.signOut = function(){
			   userService.signOut(changeUserState);
  	};

//////////////////////////////////////////////////////

    function register(status){
	      if(status === 201) {
	        $scope.User.userViewSwitch = 'Log';
	      } else {
	        $scope.User.userViewSwitch = 'NEWREG';
	      }
	    }

//////////////////////////////////////////////////////

	this.registerValidUser = function(User){
				userService.registerUser(User,register);				
			};

//////////////////////////////////////////////////////
	function uniqueUsername(data){ 
		    $scope.User.uniqueUserName = data;
		  	}

//////////////////////////////////////////////////////

	this.checkthename = function(username){
		  if(username.length > 4){
		  userService.checkthename(username,uniqueUsername);
			} else {
			console.log("avoiding checkthename until user enters a few characters");
			}
		};

//////////////////////////////////////////////////////
	function uniqueEmail(data) {
 		 	$scope.User.uniqueEmail = data;
			}

//////////////////////////////////////////////////////

	this.checktheemail = function(email){
		if (email){
				if (email.length > 4)
				{
 				userService.checktheemail(this.email,uniqueEmail);
 				} else {
 				//console.log("avoid checktheemail service until user enters a few characters");
 				}	
 			}
		};

//////////////////////////////////////////////////////

	function userInfoUpdated(data){
		console.log("calback following write of updated user info to database");
	}


	this.updateUserInfo = function(){
		//console.log($scope.User.userAbout," is userAbout {{{{{{{{");
		//console.log ($scope.User.username, " is $scope.User.username {{{{{{{{{");
		var userAbout= $scope.User.userAbout;
		var username = $scope.User.username;
 		userService.updateUserInfo(username, userAbout);			 
 		};
	
	}]);  
//END userController