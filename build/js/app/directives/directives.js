angular.module('dayBreak')

.directive('locationList', function(){
	return {
	restrict	: 'E',
	replace		: false,
	scope		: true,
	templateUrl	:'/views/locationList.html',
	link		: function( scope, elem, attrs) {
 	 }
	};
}) 

.directive('myUserFunctions', function(){
	return {templateUrl: '/views/my-user-functions.html'
	};
})



.directive('footOfPage', function(){
	return {
		restrict: 'E',
		templateUrl: '/views/foot-of-page.html'
	};
})
.directive('tagSearch', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		templateUrl: '/views/tagSearch.html'
	};
})

.directive('regView', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		templateUrl: '/views/reg-view.html',
 		link: function(scope,elem,attrs) {
			 console.log('hello world in regView directive');
		 	// scope.User.profileSelect = '';
		}
	};
 })

.directive('loginView', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: false,
		templateUrl: '/views/login-view.html',
 		link: function(scope,elem,attrs) {
  		}
	};
})

.directive('facebookLogin', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		templateUrl: '/views/facebook-login.html',
 		link: function(scope,elem,attrs) {
 
 		}
	};
})

//logged out user submits email to reset password
.directive('pwdRecover', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		templateUrl: '/views/pwd-recover.html'
	};
})

.directive('selfProfile', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		templateUrl: '/views/self-profile.html'
	};
})

//TODO Is this stil needed?
.directive('passwordReset', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		templateUrl: '/views/password-reset.html'
	};
})

// .directive('deleteAccount', function(){
// 	return {
// 		restrict: 'E',
// 		replace: false,
// 		scope: true,
// 		templateUrl: '/views/delete-account.html'
// 	};
// })

.directive('otherprofile', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		templateUrl: '/views/otherprofile.html'
	};
})


.directive('privacypolicy', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		templateUrl: '/views/privacypolicy.html'
	};
})

.directive('gridDayView', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: false,
		templateUrl: '/views/grid-day-view.html',
		link: function(scope,elem,attrs) {
 			
//			scope.User.userDayView='grid';

					}
		};
})

.directive('singleDayView', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		templateUrl: '/views/single-day-view.html',
		link: function(scope,elem,attrs) {
			scope.Day.dayWelcomeMsg = 'Check out this day!';
			scope.User.userDayView = 'single'; 
			if(scope.User.userState === 'loggedIn') {
				if (scope.User.userAddDay === 'true'){ 
					scope.Day.dayWelcomeMsg = 'Tell us about your day!';
				}
				if(scope.Day.chosenDay){
					if (scope.User.username === scope.Day.chosenDay.data[0].userName){
						elem[0].contentEditable = true;
						scope.Day.dayWelcomeMsg = 'Update your day.';
					} else {
						scope.Day.dayWelcomeMsg = 'Check out this day!';	
					}
				}
			}
		}
	};
})

.directive('userFunctionView', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		templateUrl: '/views/user-function-view.html',
		link: function(scope,elem,attrs) {

			 }
		};
	})

.directive('userProfilePage', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: false,
		templateUrl: '/views/user-profile-page.html',
		link: function(scope,elem,attrs) {

			 }
		};
	})

;
