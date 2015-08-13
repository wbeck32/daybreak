// this is userService.js for dayBreak based on roadWarrior  
angular.module('dayBreak').service('userService', ['$http', function($http ){

  this.username 	= null;
  this.userState 	= 'loggedOut';
  this.userRegister = false;//mh
  this.LoginError=false;

//Critical.  "var self = this" enables functions to communicate with scope of service... which is part of scope of userController... which is accessed as User.VARIABLENAME in index.html
  var self = this; 
/////////////////////////////////////////////////////////////////


  if (window.localStorage.getItem('token')) {
    this.username = window.localStorage.getItem('user');
    this.userState = 'loggedIn';
    console.log("found token and userState set to logged in");
    }
  else{
  	console.log('No token-userState set to logged out');
  	//this.userState = 'loggedOut';
	}
  

this.login = function(username, password, cb ){
 	$http({
		method: 'POST',
		url:'/session',
		data: {	username: username, 
				    password: password },
		headers: {'Content-Type': 'application/json'}
	})

	.then(function(response){
      console.log("response is: " + response.data.token);
      console.log("response is: " + response.data.email);
      console.log("response is: " + response.data.userAbout);
      console.log("response is: " + response.data.userName);   
      console.log("response object is: " + response.data);

		if (response.data.token){
			window.localStorage.setItem("token", response.data.token);
			window.localStorage.setItem("user", response.data.userName);
			
			self.username   = response.data.userName;
      self.email      =    response.data.email;
			self.userState  = 'loggedIn';
      self.userViewSwitch= null;
      self.LoginError=false;   
      self.userAbout  = response.data.userAbout;
      // self.created = response.data.created;
 
			console.log("user state is "+     self.userState);
      console.log("userViewSwitch is "+ self.userViewSwitch);

      cb();  //update scope

			}
		},
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
//      cb();  //TODO: why inull


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

/////////////////////////////////////////
this.signOut = function(){
	console.log("service signOut");
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    self.username = null;
    self.userState = 'loggedOut';
    //console.log("user state is "+ self.userState);
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

