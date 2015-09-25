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


.directive('singleDayView', function(){
	return {templateUrl: '/views/single-day-view.html'
	};
})


.directive('gridDayView', function(){
	return {templateUrl: '/views/grid-day-view.html'
	};
})

.directive('footOfPage', function(){
	return {templateUrl: '/views/foot-of-page.html'
	};
})

.directive('makeEditable', function(){
	return {
		restrict: 'AE',
		replace: false,
		scope: true,
		link: function(scope,elem,attrs) {
			if(scope.User.userState === 'loggedIn' && (scope.User.username === scope.Day.chosenDay.userName)){
				elem[0].contentEditable = true;
			}
		}

	};
})
.directive('tagSearch', function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		templateUrl: '/views/tagSearch.html'
	};
});