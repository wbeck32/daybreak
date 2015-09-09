angular.module('dayBreak')

.directive('locationList', function(){
	return {
	restrict	: 'E',
	replace		: false,
	scope		: true,
	templateUrl	:'/locationList.html',
	link		: function( scope, elem, attrs) {
 	 }
	};
}) 

.directive('myUserFunctions', function(){
	return {templateUrl: '/templates/my-user-functions.html'
	};
})


.directive('singleDayView', function(){
	return {templateUrl: '/templates/single-day-view.html'
	};
})


.directive('gridDayView', function(){
	return {templateUrl: '/templates/grid-day-view.html'
	};
})

.directive('footOfPage', function(){
	return {templateUrl: '/templates/foot-of-page.html'
	};
})
;