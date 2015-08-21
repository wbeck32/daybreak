dayBreak.controller('userController',
		['$scope', '$http', 'userService', function($scope,$http,userService){

		//$scope.email 			= null;
		//this.userAbout 			= null;
		this.LoginError 		= false;

		$scope.User.userViewSwitch 	= null;
		//this.user.created 		= null;   //the created date
		$scope.User.username = null;
		$scope.User.password 		= null;
		$scope.User.passwordConfirm	= null; // note these are not equal to start
		$scope.User.email = null;
		$scope.User.create = Date;	
		$scope.User.userAbout = null;

		//empty string stops error msg at start
		$scope.User.uniqueEmail 	= '';
		$scope.matchingPassword		= '';
		//$scope.validPassword = userService.validPassword; 

		$scope.User.longUsername 	= true;
		$scope.User.uniqueUserName 	= '';
		$scope.User.longUsername	= false;

		$scope.User.validPassword = false; 
				    
		//newRegValuesAllGood 	= false;
		$scope.User.LoginError = false;	     
				    
		$scope.User.userState 			= userService.userState;
		this.userRegister 		= userService.userRegister; //mh
				 
		this.showPasswordChange = false;
		this.showDeleteAccount 	= false;
 


this.emailconfirm = function(uniqueEmail, wellFormedEmail){
	if(uniqueEmail && wellFormedEmail){
		if( uniqueEmail === true && wellFormedEmail === true)
			$scope.User.validEmail = true;
		} else {
			$scope.User.validEmail = false;
			}
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

	this.newRegValuesAllGood = function(User){

	  // if ( ($scope.User.password !== null) && ($scope.User.passwordConfirm !== null ))
	  //    {if ($scope.User.password === $scope.User.passwordConfirm)
	  //     {$scope.User.matchingPassword = true;}
	  //   }
	  
	  if ($scope.User.username !== null){ 
	    if ($scope.User.username.length > 5)
	      {$scope.User.longUsername = true;}
	    else
	      {$scope.User.longUsername = false;}
	    }

	//these conditions must be met to allow registration

	  if( ($scope.User.uniqueUserName   	 === true) &&
	      ($scope.User.uniqueEmail     	=== true) &&
	     ($scope.User.validPassword  === true) &&
	      ($scope.User.longUsername     === true)     
	    )
	    {
	    console.log($scope.User.uniqueUserName, $scope.User.uniqueEmail, $scope.User.validPassword, $scope.User.longUsername);
	        console.log ("Everything is good");
	        return true;  
	  	 }
	    else
	    {
	    	
      console.log($scope.User.uniqueUserName, $scope.User.uniqueEmail, $scope.User.validPassword, $scope.User.longUsername);
	    	console.log ("Everything is NOT so good.");
	     	return false;
	    }

	};

		//////////////////////////////////////////////////////
		//in userController
    function loginState(status) {
    if(status.status === 200) {
      $scope.User.userState = 'loggedIn';
      $scope.User.userViewSwitch = null;

      $scope.User.email = status.email;
      $scope.User.username = status.userName;
      $scope.User.userAbout = status.userAbout;
    
      	//remove time of account creation for public presentation
   	  $scope.User.created = status.created.substring(0,10);
		//format: {"$date": "2015-08-20T18:37:47.626Z"}

    } else {
      $scope.User.userState = 'loggedOut';
      $scope.User.LoginError = true;           
      $scope.User.userViewSwitch = 'Log';
      $scope.User.password = '';
      $scope.User.username = '';
    }
    }

		this.login = function(){  
      userService.login(this.username, this.password,loginState);
		};


		//////////////////////////////////////////////////////
		//in userController

    function changeUserState(){
      $scope.User.username = '';
      $scope.User.userState = 'loggedOut';
      $scope.User.userViewSwitch = null;

      //below important for clearing reg form if user returns to it
      	$scope.User.username = null;
		$scope.User.password 		= null;
		$scope.User.passwordConfirm	= null; // note these are not equal to start
		$scope.User.email = null;
		$scope.User.matchingPassword= null;
		$scope.User.uniqueEmail= '';   //important, not false or null


    }

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


		this.registerValidUser = function(User){
				userService.registerUser(User,register);
				
			};


		//////////////////////////////////////////////////////
		function uniqueUsername(data){ 
		    $scope.User.uniqueUserName = data;
		  }

		this.checkthename = function(username){

		  if(username.length > 4){
		  userService.checkthename(username,uniqueUsername);
			} else {
			console.log("avoid checkthename until user enters a few characters");
			}
		};

		//////////////////////////////////////////////////////
		function uniqueEmail(data) {
 		 $scope.User.uniqueEmail = data;
		}

		this.checktheemail = function(email){
		if (email){
				if (email.length > 4){
 				userService.checktheemail(this.email,uniqueEmail);
 				} else {
 				console.log("avoid checktheemail until user enters a few characters");
 			}
 			}
		};



	}]);   //END OF userController
