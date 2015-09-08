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
this.login = function(username, password, callback){

 	$http({
		method: 'POST',
		url:'/api/session',
		data: {	username: username, 
				    password: password },
		headers: {'Content-Type': 'application/json'}
	})
//success here
	.then(function(response){
      console.log("status is: " + response.data.status);
      console.log("token is: " + response.data.token);
      console.log("email is: " + response.data.email);
      console.log("userabout is: " + response.data.userAbout);
      console.log("userName is: " + response.data.userName);   
      console.log("response object is: " + response.data);

		if (response.data.token){
			window.localStorage.setItem("token", response.data.token);
			window.localStorage.setItem("user", response.data.userName);
    	} 
      //callback(response.data.status); //callback fn loginState
      callback(response.data); //callback fn loginState


		},
  //failure here
	function(data,status,headers,config){
    callback(data.status); //callback fn loginState
	});
};


//////////////////////////////////////////////////////
//logOut signOut service)  
this.signOut = function(callback){
    console.log("service signOut");
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    callback(); //callback function is changeUserState
};


this.registerUser = function(User,callback){
  $http({
          method: 'POST',
          url: '/api/registerValidUser',
          data: {username    :User.username, 
                 password  : User.password,
                 email     : User.email},
          headers: {'Content-Type': 'application/json'}
          })
          .success(function(data, status, headers, config){
            callback(status);              

          })
          .error(function(data,status, headers, config){
            console.log("no user created ");
        }); 

};


//////////////////////////////////////////////////////
 
this.checkthename = function checkthename(username,callback){

    $http({
    method    : 'POST',
    url       : '/api/checkusername',
    data      : {username       :  username},
    headers   : {'Content-Type' : 'application/json'}
    }).success(function(data,status,headers,config){ 
      console.log('data in service: ',data);
      callback(data);
    }).error(function(data,status, headers, config){
      console.log("In userService data is: " + data);
      console.log("NOTHING FOUND RIGHT?");
    }); 

};


//////////////////////////////////////////////////////
this.checktheemail = function( email,callback){
    $http({
    method    : 'POST',
    url       : '/api/checkemail',
    data      : { email         :  email},
    headers   : {'Content-Type' : 'application/json'}
    })
    .success(function(data){
      console.log('data in email service: ',data);
      callback(data);
      })
    .error(function(data,status, headers, config){
          console.log("data is: " + data);
          self.uniqueEmail = false;
          //cb(); //update scope
      }); 
};



this.updateUserInfo = function(user, callback){

  console.log(user, " is user incoming at userService");

  $http({
    method    : 'POST',
    url       : '/api/updateuserinfo',
    data      : { User         :  user},
    headers   : {'Content-Type' : 'application/json'}
    })
    .success(function(data){
      console.log('userabout');
      callback();
      })
    .error(function(data,status, headers, config){
          console.log("data is: " + data);
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

