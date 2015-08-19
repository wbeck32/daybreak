dayBreak.controller('userController',
		['$scope', '$http', 'userService', function($scope,$http,userService){

$scope.email 			= null;
		this.userAbout 			= null;
		this.LoginError 		= false;

		$scope.User.userViewSwitch 	= null;
		this.created 			= null;   //the created date

		$scope.User.username = null;
//		$scope.username  		= null;
		this.usernameLength 	= 5;  //set minimum usernameLength

		this.password = null;
		this.password = null;
		$scope.password 		= null;
		$scope.passwordConfirm	= null; // note these are not equal to start
				  	
 

		console.log("initialization of $scope.uniqueUserName is: " + $scope.uniqueUserName);

		//true stops error msg at start
		$scope.User.uniqueEmail 		= '';
		//$scope.matchingPassword	= userService.matchingPassword;
		//$scope.validPassword = userService.validPassword; 

		$scope.User.longUsername 	= true;


		$scope.User.uniqueUserName = '';
		$scope.User.longUsername	= userService.longUsername;

		$scope.User.matchingPassword = userService.matchingPassword; 
		//valid includes matching and other criteria
		$scope.User.validPassword = userService.validPassword; 
				    
		newRegValuesAllGood 	= false;
			$scope.User.LoginError = false;	     
				    
		$scope.User.userState 			= userService.userState;
		this.userRegister 		= userService.userRegister; //mh
				 
		this.showPasswordChange = false;
		this.showDeleteAccount 	= false;



	//on keyup test password for match and other criteria.
this.passconfirm = function(pass, passconfirm){

if(pass && passconfirm){
  console.log("password is : " + pass + "  passconfirm is: " + passconfirm);
  console.log("pass.length is" + pass.length);
		if  (pass === passconfirm) 
			{$scope.User.matchingPassword = true;}
		else
			{$scope.User.matchingPassword = false;}

		if ((pass.length > 5) && (matchingPassword = true ))
			{$scope.User.validPassword = true;}
}
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
	//$scope.User.uniqueUserName 	= userService.uniqueUserName;
	//$scope.User.uniqueEmail 	= userService.uniqueEmail;
  //$scope.User.username = userService.username;
	// console.log("$scope.User.uniqueUserName is: "+$scope.User.uniqueUserName );
	// console.log("$scope.User.uniqueEmail is: " + $scope.User.uniqueEmail);

	  if ( (User.password !== null) && (User.passwordConfirm !== null ))
	    {if (User.password === User.passwordConfirm)
	      {User.matchingPassword = true;}
	    }
	  
	  if (User.username !== null){
	    if (User.username.length > 5)
	      {$scope.User.longUsername = true;}
	    else
	      {$scope.User.longUsername = true;}
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

		//////////////////////////////////////////////////////
		//in userController
    function loginState() {
      $scope.User.userState = 'loggedIn';
      $scope.User.userViewSwitch = null;
    }

		this.login = function(){  

      console.log("######## logging in as ..." + this.username);
      console.log("######## this.password: " + this.password);
      console.log("In controller first LoginError is: "+this.LoginError );

      userService.login(this.username, this.password,loginState);
 			    // Important: Must pass update scope into service as a callback so that it is available to update scope after api calls return results.
		};


		//////////////////////////////////////////////////////
		//in userController

    function changeUserState(){
      $scope.User.username = '';
      $scope.User.userState = 'loggedOut';
      $scope.User.userViewSwitch = null;
    }

 		this.signOut = function(){
				console.log("calling signout...");
			   userService.signOut(changeUserState);
  	};


		//////////////////////////////////////////////////////
    function register(status){
      if(status === 201) {
        $scope.User.userViewSwitch = 'Log';
      } else {
        $scope.User.LoginError = true;
      }
    }


		this.registerValidUser = function(User){
				console.log("*******************************");
				console.log(User.username + " is username at registerUser");
				console.log(User.email    + " is email at registerUser   ");
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
