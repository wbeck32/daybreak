// this is userService.js for dayBreak based on roadWarrior  
dayBreak.service('userService', ['$http', function($http ){

  console.log('userService start');

  this.username 	= "";           //initialize username to null
  this.userState 	= 'loggedOut';  //initialize userState to loggedOut
  this.LoginError = false;        //initialize to false - no error yet
  this.uniqueUserName = false;    //we have not yet tested for unique
  this.uniqueEmail = false;       //we have not yet tested for unique

/////////////////////////////////////////////////////////////////

//Critical.  "var self = this" enables functions to communicate with scope of service... 
//which is part of scope of userController... 
//which is accessed as User.VARIABLENAME in index.html
  var self = this; 

/////////////////////////////////////////////////////////////////

this.emailreset=function( newemail,username){
  console.log('userService receives newemail value of : ', newemail);
  console.log('userService receives username value of : ', username);

  $http({
      method: 'POST',
      url: '/api/emailreset',
      data: {
        newemail: newemail,
        username: username
      },
      headers: {'Content-Type': 'application/json'}
    }).success(function(data, status, headers, config){

      console.log('email reset send successful ');
      alert('An email has been sent to your account, go check it out to proceed. You can close this window.');
    }).error(function(data, status, headers, config){
      console.log('email reset failed: ' + data);
    });
};

 
this.init = function(completeInit){
//check if valid token exists from previous session
  console.log("start init in app.js -------------------");
  if (window.localStorage.getItem('token') ) 
    {
    this.token    = window.localStorage.getItem('token');
    this.username = window.localStorage.getItem('user');

    $http({
        method: 'POST',
        url:'/api/loginrefresh',
        data: { token    : this.token  
              },
        headers: {'Content-Type': 'application/json'}
    })
    .then(function(response)   //success path
    {
    console.log('found valid token and user name'); 

    completeInit(response);
    },
  //failure path here TODO: WE DO NOT EVER GET HERE?
  function(data,status,headers,config){
    console.log('No token-userState is set to loggedout');
    //this.userState = 'loggedOut';   
    //completeInit(data.status); //callback fn loginState
  });
}
};

  
//////////////////////////////////////////////////////  
// login service
// Case: user supplies valide username and password - we set username and token
//////////////////////////////////////////////////////

this.login = function(username, password, callback){
 	$http({
		method: 'POST',
		url:'/api/login',
		data: {	username: username, 
				    password: password },
		headers: {'Content-Type': 'application/json'}
	})
//success here
	.then(function(response){
  		if (response.data.token){
			window.localStorage.setItem("token", response.data.token);
			//window.localStorage.setItem("user", response.data.userName);
    	} 
      callback(response.data); //callback fn loginState
	},
  //failure here
	function(data,status,headers,config){
    callback(data.status); //callback fn loginState
	});
};

//Case: user has token stored locally and refreshes page
this.loginRefresh = function(username, login, callback){
  $http({
    method: 'POST',
    url:'/api/loginrefresh',
    data: { username: username, 
            token: token },
    headers: {'Content-Type': 'application/json'}
  })
//success here
  .then(function(response){
  if (response.data.token){
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("user", response.data.userName);
      } 
  callback(response.data); //callback fn loginState
  },
  //failure here
  function(data,status,headers,config){
  callback(data.status); //callback fn loginState
  });
};

//////////////////////////////////////////////////////
//logOut signOut service)  
// signOut is client only: TODO - add save signout time and user signed out tracking on server
///////////////////////////////////////////////////////
this.signOut = function(callback){
    console.log("service signOut");
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    callback(); //callback function is changeUserState
};


//////////////////////////////////////////////////////

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
      console.log("NOTHING FOUND ?");
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

//////////////////////////////////////////////////////
this.updateUserInfo = function(username, userAbout){

  console.log( userAbout," is userAbout incoming at userService))))))");
  console.log( username," is userName incoming at userService)))))))");

  $http({
    method    : 'POST',
    url       : '/api/updateuserinfo',
    data      : { userAbout     :  userAbout,
                  userName      :  username},
    headers   : {'Content-Type' : 'application/json'}
    })
    .success(function(data){
      console.log('userabout');
      //callback();
      })
    .error(function(data,status, headers, config){
          console.log("data is: " + data);
        }); 
};

//////////////////////////////////////////////////////

//working above
///////////
//models below
 
this.passwordChange = function(password, newPassword){
	console.log("service logIn");

};


this.resetPassword = function(username){

};

// this.deleteAccount = function(cb){
// /// set save User.activestatus for loggedIn user = 'delete' 

// };



//////////////////////////////////////////////////////
//Username password RECOVERY for loggedout user, 
//distinct from logged in user password reset
  this.passwordreset = function(knownemail) {

    console.log('at user service knownemail is: ', knownemail);

    $http({
      method: 'POST',
      url: '/api/passwordreset',
      data: {
        knownemail: knownemail
      },
      headers: {'Content-Type': 'application/json'}
    }).success(function(data, status, headers, config){
      console.log('reset post successful');
      alert('An email has been sent to your account, go check it out to proceed. You can close this window.');
    }).error(function(data, status, headers, config){
      console.log('reset post failed: ' + data);
    });
  };

//password change while logged in 
   this.changepassword = function(password, newPassword) {
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





  // this.deleteaccount = function(username, changeUserState) {

  //   console.log('incoming service username for deletion is', username);
     
  //   $http({
  //     method: 'POST',
  //     url: '/api/deleteaccount',
  //     data: {
  //       username: username
  //       },
  //     headers: {'Content-Type': 'application/json'}
  //   }).success(function(data, status, headers, config){
      
  //     console.log('returning success at service after deletion?');
  //     console.log(data, ' is data on SUCCESS at service');
  //     console.log(status, ' is status on SUCCESS at service');

  //     changeUserState(); //logout

  //    }).error(function(data, status, headers, config){
  //     console.log(data.body, ' is data on FAILURE at service');
      
  //     changeUserState();

  //   });
  // };



  this.deleteaccountService = function(username, changeUserState){

    console.log('incoming service username for deletion is', username);
     
    $http({
      method: 'POST',
      url: '/api/deleteaccountapi',
      data: {
        username: username
        },
      headers: {'Content-Type': 'application/json'}
    }) //success condition

    .then(

      function(data, status, headers, config){
      
      console.log('returning success at service after deletion?');
      console.log(status, ' is status on SUCCESS at service');

      changeUserState();

       },
    
      //failure condition
      function(data, status, headers, config){
         console.log('FAILURE at service');
      
 
    });
  };


}]);

