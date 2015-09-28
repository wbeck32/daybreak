dayBreak.controller('userController',
		['$scope', '$rootScope','$http','$location','userService', 'dayService',function($scope,$rootscope, $http,$location,userService,dayService){
		
		$scope.User.userFunction 	= null; //determines visibility of user functions, Log, NEWREG, etc.
		$scope.User.userMessage	 	= null;  
 		//$scope.User.userDayView 	= 'grid';  //user can change to 'single'
 		$scope.User.userViewSwitch 	= null; // single, grid, profile
 		$scope.User.userAddDay 		= null;

 		$scope.User.password 		= null;
		$scope.User.passwordConfirm	= null; 
		$scope.User.email 			= null;

		$scope.User.userAbout 		= null;
 		$scope.User.uniqueEmail 	= '';    // email is unique in database
		$scope.matchingPassword		= '';
 		$scope.User.uniqueUserName 	= '';
		$scope.User.longUsername	= false;
 		$scope.User.validPassword 	= false; 
 		$scope.User.LoginError 		= false;	     
		$scope.User.username 		= userService.username;	    
		$scope.User.userState 		= userService.userState;
 		$scope.User.submitMethod	= null;
 		$scope.User.oldemail= $scope.User.email;
		var token = null;
		
		if($location.search().modal && $location.search().tkn){
			var modal = $location.search().modal.valueOf();
			token = $location.search().tkn.valueOf();
			if (modal === 'pwr') {
				$scope.User.userViewSwitch = 'passwordreset';
			}
		}
		
 
//////////////////////////////////////////////////////

//init callback function
	function completeInit(response){ 
		console.log('completeInit is happening');
		$scope.User.userState 	='loggedIn';
	 	$scope.User.username 	= response.data.userName;
	 	$scope.User.email 		= response.data.email;
	 	$scope.User.userAbout 	= response.data.userAbout;
 	 	$scope.User.created 	= response.data.created.substring(0,10); //truncate time
	}

// do INIT() on page reload and callback completeInit 
// to complete intializaiton if username and token are confirmed - 
userService.init(completeInit);
 
//////////////////////////////////////////////////////

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
		 		console.log('1: ',$scope.User.uniqueUserName, '2: ',$scope.User.uniqueEmail, '3: ',$scope.User.validPassword, '4: ',$scope.User.longUsername);
		    	console.log ("Login requirements NOT met.");
		     	return false;
		    }
		};

//////////////////////////////////////////////////////
//loginState REQUIRES 200 RESPONSE
//COULD ADD loginState depends on recent token
//callback function for login

	function loginState(response) {
	    if(response.status === 200) {
  		      $scope.User.userState = 'loggedIn';
 		      $scope.User.userViewSwitch = null;
 		      $scope.User.userFunction = null;

		      $scope.User.email = response.email;
		      $scope.User.username = response.userName;
		      $scope.User.userAbout = response.userAbout;
			  //remove time of account creation for public presentation
		   	  $scope.User.created = response.created.substring(0,10);
			  //format: {"$date": "2015-08-20T18:37:47.626Z"}
 	    } else {
	    	  // $scope.User.userFormView='hide';
		      $scope.User.userState = 'loggedOut';
 		      $scope.User.LoginError = true;   

 		      $scope.User.userViewSwitch = 'profile';
         	  $scope.User.userFunction = 'Log';
		      
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
 
    function changeUserState(){

    	console.log('returning user state values to null at changeUserState');

     	$scope.User.userState = 'loggedOut';
      	$scope.User.userViewSwitch = null;
      	//below important for clearing reg form if user returns to it
      	$scope.User.username 		= null;
		$scope.User.password 		= null; //should be null
		$scope.User.passwordConfirm	= '';   //should be 0 length string
		$scope.User.email 			= null;
		$scope.User.matchingPassword= null;
		$scope.User.uniqueEmail		= '';  //important, not false or null
	    }


  	this.signOut = function(){
			   userService.signOut(changeUserState);
  	};

//////////////////////////////////////////////////////


	this.emailreset = function(newemail){
		username = $scope.User.username;

		console.log('requesting reset email following email change', newemail);		
		console.log('requesting reset email for user: ', username);
 
 		userService.emailreset(newemail, username);
	};

//////////////////////////////////////////////////////
//email based password RECOVERY for non-loggedin user, 
//distinct from logged in user password change
this.passwordreset = function(knownemail){
	userService.passwordreset(knownemail);
};




function closepwdchangemodal(){
		console.log('running closepwdchangemodal');
		window.location.replace('/');
	 	$scope.User.userViewSwitch 	= null;
	 	$scope.User.userMessage		= "Password change successful!";
		//$scope.User.userFormView 	= 'hide';  //can change to 'show'  		
 		$scope.User.userDayView 	= 'grid';  //user can change to 'single'
}

//////////////////////////////////////////////////////
//password change while logged in - if logged out, submit the url
this.changepassword = function(User, callback){ console.log($scope.User.userState);
	if($scope.User.userState === 'loggedOut') {
		var url = window.location.href.split('#')[0]+'api/verifypasswordreset/';
		userService.pwdChangeLoggedOut(url,token,User,closepwdchangemodal);
	} else {
	userService.changepassword(User, closepwdchangemodal);
	}
};


//////////////////////////////////////////////////////

    function register(status){ 
	      if(status === 200) {
	        $scope.User.userMessage = 'Registration confirmation email has been sent.';
	        $scope.User.userViewSwitch = null;
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


	this.deleteaccount = function(username){
		console.log('delete account for this user in CONTROLLER', username);
	
		usernameToDelete = username;  //preserve only this
  		$scope.User.userViewSwitch 	= null; 	  //close modal

 		userService.deleteaccountService(usernameToDelete, changeUserState); //then send db command
		// changeUserState();
	};

//////////////////////////////////////////////////////

	function userInfoUpdated(data){
		console.log("callback following write of updated user info to database");
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