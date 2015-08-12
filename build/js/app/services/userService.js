// this is userService.js for dayBreak based on roadWarrior  
angular.module('dayBreak').service('userService', ['$http', function($http ){

  this.username 	= null;
  this.userState 	= 'loggedOut';
  this.userRegister = false;//mh
  this.userTest = "first time";

  var self = this; 

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
	.success(function(data, status, headers, config)
		{
 		  console.log("data.token is:     " + data.token );
  	 
      console.log("data.email is:     " + data.email );
      console.log("data.userAbout is: " + data.userAbout);
    console.log("data.userName is: " + data.userName);


      self.email = data.email;
      self.userAbout = data.userAbout;
      this.userName = data.userName;

		if (data.token){

			window.localStorage.setItem("token", data.token);
			window.localStorage.setItem("user", data.user);
			
			self.username = data.user;

      self.email = data.email;
			self.userState = 'loggedIn';
      self.userViewSwitch='None';
      self.userAbout = data.userAbout;
      self.created = data.created;
 
			console.log("user state is "+ this.userState);
      console.log("userViewSwitch is "+ this.userViewSwitch);

			cb();  //TODO: why is this here?
			}
		})

	.error(function(data,status,headers,config){
		console.log("login unsuccessful");
	});
};

//////////////////////////////////////////
this.about = function(){

  $http.get('/user').
    then(function(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response.userName, response.email, response.aboutUser);

    }, function(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log ("oops error");
    });


};

/////////////////////////////////////////


this.signOut = function(){
	console.log("service signOut");
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    //window.localStorage.removeItem('userid');
    this.username = null;
    this.userState = 'loggedOut';

    self.userTest = "second time";

    console.log("user state is "+ self.userState);

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

