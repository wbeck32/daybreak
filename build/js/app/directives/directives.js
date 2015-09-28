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

.directive('gridDayView', function(){
	return {templateUrl: '/views/grid-day-view.html'
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
				if(scope.User.userAddDay === 'true' ) {
					scope.Day.dayWelcomeMsg = 'Tell us about your day!';
				} 
				if (scope.User.username === scope.Day.chosenDay.data[0].userName){
					elem[0].contentEditable = true;
					scope.Day.dayWelcomeMsg = 'Update your day.';
				}
			}
		}
	};
});
