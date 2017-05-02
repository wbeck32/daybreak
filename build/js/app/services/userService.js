// this is userService.js for dayBreak based on roadWarrior
dayBreak.service('userService', ['$http', function($http ){

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
this.pwdChangeLoggedOut = function(url,token,User,callback) {
var pw1 = btoa(User.password);
var pw2 = btoa(User.passwordConfirm);

  $http({
    method:'GET',
    url: '/api/verifypasswordreset/'+token+'/'+pw1+'/'+pw2,
    headers: {'Content-Type': 'application/json'}
    }).then(function(response){
      console.log('success: ',response);
      callback();

  },
    function(response){
    console.log('failure: ',response);
  });
};

this.emailreset=function( newemail,username){

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
      User.userMessage = 'An email has been sent to your account, go check it out to proceed.';
      //alert('An email has been sent to your account, go check it out to proceed. You can close this window.');
    }).error(function(data, status, headers, config){
      console.log('email reset failed: ' + data);
    });
};


this.init = function(completeInit){
//check if valid token exists from previous session
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
    .then(
    function(data,status,headers,config)   //success path
    {
    // console.log('found valid token and user name and status is: ', data.status);

    completeInit(data);
    },
  //failure path here TODO: WE DO NOT EVER GET HERE?
    function(data,status,headers,config){
    console.log('No token-userState is set to loggedout');

  });
}
};


//////////////////////////////////////////////////////
// login service
// Case: user supplies valide username and password - we set username and token
//////////////////////////////////////////////////////

this.login = function(username, password, callback){    console.log('service login ....');
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
      console.log(response.data, "is response.data on login success");
      callback(response.data); //callback fn loginState
	},
  //failure here
	function(response){
    if(response.data){
          console.log(response.data, "IS response.data on login failure");
          console.log(response.status, "IS response.status on login failure");

          callback(response.status); //callback fn loginState
          }
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
this.signOut = function(changeUserState){
    console.log("service signOut");
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    changeUserState(); //callback function is changeUserState
};


//////////////////////////////////////////////////////

this.registerUser = function(User,callback){
  $http({
          method: 'POST',
          url: '/api/registerValidUser',
          data: {username  : User.username,
                 password  : User.password,
                 email     : User.email},
          headers: {'Content-Type': 'application/json'}
          })
          .then(function(response){ console.log(response);
            User.userMessage = 'An email has been sent to your account.  Click the link to confirm your registration.';
            callback(response.status);
            //alert('An email has been sent to your account.  Click the link to confirm your registration.');
          },
          function(response){

            console.log("no user created ");
          });
};



//////////////////////////////////////////////////////

  this.checkthename=function checkthename(username,callback){
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





 // get the user information for the selected user, who is not logged in user
this.otherUserInfo = function(otherusername, callback){
  $http({
    method    : 'POST',
    url       : '/api/otheruserinfo',
    data      : { userName     :  otherusername},
    headers   : {'Content-Type' : 'application/json'}
    })
    .success(function(data){
      console.log('data is: ', otherUser, otherUser.userName, otherUser.created, otherUser.userAbout);
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
    })
    .then(function(data, status, headers, config){
      console.log('reset post successful');
      //alert('An email has been sent to your account, go check it out to proceed. You can close this window.');
      User.userMessage = 'An email has been sent to your account, go check it out to proceed.';
    },
    function(data, status, headers, config){
      console.log('reset post failed: ' + data);
    });



  };

//////////////////////////////////////////////////////
//password change while logged in

   this.changepassword = function(User, closepwdchangemodal) {

    console.log('^^^^^^^^^changepassword service', User.password, ' and ', User.username);

    $http({
      method: 'POST',
      url: '/api/changepassword',
      data: {
        password: User.password,
        username: User.username
      },
      headers: {'Content-Type': 'application/json'}
    })
    //success here
    .then(
        function(data, status, headers, config){

            console.log('data.status is: ', data.status);

            if (data.status===200){
                console.log("success at service");
                closepwdchangemodal();

            }  else{
                console.log("failure at service");
            }
        }
      );
  };


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
         console.log('FAILURE at delete account service');


    });
  };


}]);
