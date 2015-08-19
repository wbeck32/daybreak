// this is userService.js for dayBreak based on roadWarrior  
dayBreak.service('userService', ['$http', function($http ){

  console.log('userService start');

  this.username 	= "";           //initialize username to null
  this.userState 	= 'loggedOut';  //initialize userState to loggedOut
  this.LoginError = false;        //initialize to false - no error yet
  this.uniqueUserName = false;    //we have not yet tested for unique
  this.uniqueEmail = false;       //we have not yet tested for unique

//Critical.  "var self = this" enables functions to communicate with scope of service... which is part of scope of userController... which is accessed as User.VARIABLENAME in index.html
  var self = this; 
/////////////////////////////////////////////////////////////////

//check if valid token exists from previous session

  if (window.localStorage.getItem('token')) 
    {
    this.username = window.localStorage.getItem('user');
    this.userState = 'loggedIn';
    console.log("found token and userState set to logged in");
    }
  else{
  	console.log('No token-userState is currently logged out');
  	//this.userState = 'loggedOut';  //default so not needed
	}
  
//////////////////////////////////////////////////////  
//login service
this.login = function(username, password, cb){

  console.log('username is' + username);

 	$http({
		method: 'POST',
		url:'/session',
		data: {	username: username, 
				    password: password },
		headers: {'Content-Type': 'application/json'}
	})
//success here
	.then(function(response){
      console.log("response is: " + response.data.token);
      console.log("response is: " + response.data.email);
      console.log("response is: " + response.data.userAbout);
      console.log("response is: " + response.data.userName);   
      console.log("response object is: " + response.data);

		if (response.data.token){
			window.localStorage.setItem("token", response.data.token);
			window.localStorage.setItem("user", response.data.userName);
			
			self.username       = response.data.userName;
      self.email          = response.data.email;
			self.userState      = 'loggedIn';
      self.userViewSwitch = null;
      self.LoginError     = false;   
      self.userAbout      = response.data.userAbout;
      // self.created = response.data.created;
 
			console.log("user state is "+     self.userState);
      console.log("userViewSwitch is "+ self.userViewSwitch);

      cb();  //update scope

			}
		},
  //failure here
	function(data,status,headers,config){

    console.log("userService.js:  send status is: " + status);
		console.log("userService.js:  login unsuccessful");
 
    self.LoginError = true;
    self.username = null;
    self.password = null;
    self.userViewSwitch= 'Log';
    cb();  //update the scope
	});
};


//////////////////////////////////////////////////////
//logOut signOut service)  
this.signOut = function(cb){
    console.log("service signOut");
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    self.username = null;
    self.userState = 'loggedOut';
    cb();  //updateScope
};


//////////////////////////////////////////////////////
//important!  refer to username, not "this.username"
//because this is a service, not in controller
// this is required to inject username to service
this.checkthename = function( username){

    console.log("in service sending to check: " + username);

    $http({
    method    : 'POST',
    url       : '/api/checkusername',
    data      : {username       :  username},
    headers   : {'Content-Type' : 'application/json'}
    })
    .success(function(res ){

          console.log("in service checkthename() result is:  " + JSON.parse(res ) );

          //important!  this attaches to "scope" of the service, which is part of the controller
          self.uniqueUserName =  JSON.parse(res ) ;
          
          console.log("In service uniqueUserName is: " + self.uniqueUserName);

          //important! cannot be used in service 
          //because $scope unavailable 
          //$scope.User.uniqueUserName = self.uniqueUserName;
 
          // cb();  //update scope

      })
    .error(function(data,status, headers, config){
          console.log("In userService data is: " + data);
          console.log("NOTHING FOUND ");
         // self.uniqueUserName=false;
          //cb();  //update scope

      }); 
};


//////////////////////////////////////////////////////
this.checktheemail = function( email){
    $http({
    method    : 'POST',
    url       : '/api/checkemail',
    data      : { email         :  email},
    headers   : {'Content-Type' : 'application/json'}
    })
    .success(function(response){
          console.log("response is:  " + JSON.parse(response ) );
          self.uniqueEmail =  JSON.parse(response ) ;

          console.log("in userService the uniqueEmail is : " + self.uniqueEmail);

 
          //important! following cannot be used in service 
          //because $scope unavailable 
          // $scope.User.uniqueEmail = self.uniqueEmail;
          //User.uniqueEmail = self.uniqueEmail;      

          //cb();  //update scope

      })
    .error(function(data,status, headers, config){
          console.log("data is: " + data);
          self.uniqueEmail = false;
          //cb(); //update scope
      }); 
};



//////////////////////////////////////////////////////
//NOT IN USE  SEE CONTROLLER
this.RegValuesAllGood = function(uniqueUserName, uniqueEmail, password, passwordConfirm){

console.log(" IN SERVICE ----------------------");
console.log("this.uniqueUserName is: " + self.uniqueUserName);
console.log("this.uniqueEmail is: " + self.uniqueEmail);
console.log("this.password is: " + self.password);
console.log("this.passwordConfirm is: " + self.passwordConfirm);
console.log("this.username is: " + self.username);
console.log(" IN SERVICE ----------------------- ");

  if ( (self.uniqueUsername   = true) &&
       (self.uniqueEmail    = true)   &&
       (password       === passwordConfirm) &&
       (self.username.length  > 5)     
     )
    {  return true;  }
  else
    {  return false;}
};


//////////////////////////////////////////////////////
 this.newRegValuesAllGood = function(){

console.log(" -------------------------- ");
console.log("this.uniqueUserName is: "  + self.uniqueUserName);
console.log("this.longUsername is: " + self.longUsername);
console.log("this.uniqueEmail is: "   + self.uniqueEmail);
console.log("this.password is: "    + self.password);
console.log("this.passwordConfirm is: " + self.passwordConfirm);
console.log("this.matchingPassowrd is: " + self.matchingPassword);
console.log("this.username is: "    + self.username);
 
  if ( (this.password !== null) && (this.passwordConfirm !== null ))
    {if (this.password === this.passwordConfirm)
      {self.matchingPassword = true;}
    }
  
  if (this.username !== null){
    if (this.username.length > 5)
      {self.longUsername = true;}
    else
      {self.longUsername = false;}
    }


 
//these conditions must be met to allow registration

  if( (self.uniqueUsername    === true) &&
      (self.uniqueEmail     === true) &&
      (self.matchingPassword  === true) &&
      (self.longUsername     === true)     
    )
    {
       return true;  }
    else
    {return false;}
};





//working above
///////////
//models below
 
this.passwordChange = function(password, newPassword){
	console.log("service logIn");

};


this.resetPassword = function(username){

};


this.deleteAccount = function(cb){

};

 
  this.passwordChange = function(password, newPassword) {
    $http({
      method: 'POST',
      url: '/api/passwordchange',
      data: {
        password: password,
        newpassword: newPassword,
        username: this.username,
        access_token: window.localStorage.getItem('token')
      },
      headers: {'Content-Type': 'application/json'}
    }).success(function(data, status, headers, config){
      if(data === '1') {
        alert("Password Changed!");
      } else {
        alert("Sorry, there was an error processing your request");
      }
    }).error(function(data, status, headers, config){
      console.log('password change error');
    });
  };

  this.resetPassword = function(username) {
    $http({
      method: 'POST',
      url: '/api/passwordresetemail',
      data: {
        username: username
      },
      headers: {'Content-Type': 'application/json'}
    }).success(function(data, status, headers, config){
      console.log('reset post successful');
      alert('An email has been sent to your account, go check it out to proceed. You can close this window.');
    }).error(function(data, status, headers, config){
      console.log('reset post failed: ' + data);
    });
  };

  this.deleteAccount = function(cb) {
    $http({
      method: 'POST',
      url: '/api/deleteaccount',
      data: {
        username: this.username,
        access_token: window.localStorage.getItem('token')
      },
      headers: {'Content-Type': 'application/json'}
    }).success(function(data, status, headers, config){
      console.log(data);
      self.signOut();
      cb();
    }).error(function(data, status, headers, config){
      console.log(data);
    });
  };

}]);


 
//////////////////////////////////////////
// this.about = function(){
//   $http.get('/user').
//     then(function(response) {
//       // this callback will be called asynchronously
//       // when the response is available
//       console.log("RESPONSE VALUES ARE: " + response.userName, response.email, response.aboutUser, response.created);

//     }, function(response) {
//       // called asynchronously if an error occurs
//       // or server returns response with an error status.
//       console.log ("oops error");
//     });
// };

