dayBreak.controller('userController',
		['$scope', '$http', 'userService', function($scope,$http,userService){

$scope.email 			= null;
		this.userAbout 			= null;
		this.LoginError 		= false;

		$scope.User.userViewSwitch 	= null;
		this.created 			= null;   //the created date

		$scope.User.username = null;
//		$scope.username  		= null;
		//this.usernameLength 	= 5;  //set minimum usernameLength

		//this.password = null;
		//this.password = null;
		$scope.User.password 		= null;
		$scope.User.passwordConfirm	= null; // note these are not equal to start
				  	
 


		//true stops error msg at start
		$scope.User.uniqueEmail 		= '';
		$scope.matchingPassword	= '';
		//$scope.validPassword = userService.validPassword; 

		$scope.User.longUsername 	= true;


		$scope.User.uniqueUserName = '';
		$scope.User.longUsername	= false;

		$scope.User.validPassword = false; 
				    
		newRegValuesAllGood 	= false;
			$scope.User.LoginError = false;	     
				    
		$scope.User.userState 			= userService.userState;
		this.userRegister 		= userService.userRegister; //mh
				 
		this.showPasswordChange = false;
		this.showDeleteAccount 	= false;



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
    if(status === 200) {
      $scope.User.userState = 'loggedIn';
      $scope.User.userViewSwitch = null;
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
  userService.checkthename(username,uniqueUsername);
};

		//////////////////////////////////////////////////////
function uniqueEmail(data) {
  $scope.User.uniqueEmail = data;
}


		this.checktheemail = function(email){
 			userService.checktheemail(this.email,uniqueEmail);
		};



	}]);   //END OF user2Controller
