// this is userService.js for dayBreak based on roadWarrior  

angular.module('dayBreak').service('userService', ['$http', function($http){

  this.username 	= null;
  this.userState 	= 'loggedOut';
  this.dupeUsername = false;
  this.userRegister = false;//mh

  var self = this;

  if (window.localStorage.getItem('token')) {
    //trekService.renderAllSavedTreks();
    this.username = window.localStorage.getItem('user');
    this.userState = 'loggedIn';

    console.log("found token and userState set to logged in");
  }
  else{
  	console.log('No token-userState set to logged out');
  	//this.userState = 'loggedOut';
	}


this.registerUser = function(username, password, email, cb){

	console.log(username + " is username");
	console.log(email    + " is email   ");

	$http({
		method: 'POST',
		url: '/user',
		data: {username: username, 
			   password: password,
			   email   : email},
		headers: {'Content-Type': 'application/json'}
		})
		.success(function(data, status, headers, config){
			console.log( "user created - data value is  " + data + " and status is " + status);
		})
		.error(function(data,status, headers, config){
	 		console.log("no user created ");
	});	
};


this.login = function(username, password, cb){

	console.log("service login + cb " + cb);

	$http({
		method: 'POST',
		url:'/session',
		data: {	username: username, 
				password: password },
		headers: {'Content-Type': 'application/json'}
	})
	.success(function(data, status, headers, config)
		{

		console.log(data.token + 	" is token");
  		console.log(data.user + " is data.user");
 
		if (data.token){

			window.localStorage.setItem("token", data.token);
			window.localStorage.setItem("user", data.user);
			
			self.username = data.user;
			self.userState = 'loggedIn';

			console.log("user state is "+ self.userState);

			cb();  //TODO: why is this here?
			}
		})

	.error(function(data,status,headers,config){
		console.log("login unsuccessful");
	});
};


this.signOut = function(){
	console.log("service signOut");
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    //window.localStorage.removeItem('userid');
    this.username = null;
    this.userState = 'loggedOut';

    console.log("user state is "+ self.userState);

};


//make sure chosen username does not already exist
this.checkUsername = function(username, cb) {

    $http({
      method: 'POST',
      url: '/checkUsername',
      data: {username: username},
      headers: {'Content-Type':'application/json'}
    })
    .success(function(data, status, headers, config){
      var result = parseInt(data);
      if(result > 0){
        self.dupeUsername = true;
        console.log("DUPLICATE ALERT");         
      } else {
        self.dupeUsername = false;
        console.log("UNIQUE NAME CHOSEN");
      }
      cb();
    })
    .error(function(data, status, headers, config){
      console.log('Failure........');
    });
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


 
  // this.checkUsername = function(username, cb) {
  //   $http({
  //     method: 'POST',
  //     url: 'api/usercheck',
  //     data: {username: username},
  //     headers: {'Content-Type':'application/json'}
  //   }).success(function(data, status, headers, config){
  //     var result = parseInt(data);
  //     if(result > 0){
  //       self.dupeUsername = true;          
  //     } else {
  //       self.dupeUsername = false;
  //     }
  //     cb();
  //   }).error(function(data, status, headers, config){
  //     console.log('Failure.');
  //   });
  // };

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

