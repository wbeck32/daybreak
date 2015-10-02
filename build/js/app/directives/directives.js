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

// .directive('otherProfile', function(){
// 	return {
// 		restrict: 'E',
// 		replace: false,
// 		scope: true,
// 		templateUrl: '/views/other-profile.html'
// 	};
// })

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
		templateUrl: '/views/singleDayView.html',
		link: function(scope,elem,attrs) {

		}
	};
})
.directive('addDay', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		templateUrl: '/views/addDay.html',
		link: function(scope,elem,attrs) {
			
		}
	}

})
.directive('updateDay', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		templateUrl: '/views/updateDay.html',
		link: function(scope,elem,attrs) {
			
		}
	}

})
.directive('viewDay', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		templateUrl: '/views/viewDay.html',
		link: function(scope,elem,attrs) {
		console.log('scope: ',scope,' elem: ',elem,' attrs: ',attrs);	
		}
	}

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
.directive('draggable', function($document){
	return {

		link: function(scope,elem,attr) {
			var startX = 0, startY = 0, x = 0, y = 0;
			element.css({
				border: '1px solid red'
			});
			element.on('mousedown', function(event){
				event.preventDefault();
				startX = event.screenX - x;
				startY = event.screenY - y;
				$document.on('mousemove', mousemove);
				$document.on('mouseup', mouseup);
			});
			function mousemove(event) {
				y = event.screenY - startY;
				x = event.screenX - startX;
				element.css({
					top: y + 'px',
					left: x + 'px'
				});
			}

			function mouseup() {
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
			}
		}
	}
});
