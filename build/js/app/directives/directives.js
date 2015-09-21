angular.module('dayBreak')

.directive('locationList', function(){
	return {
	restrict	: 'E',
	replace		: false,
	scope		: true,
	templateUrl	:'/templates/locationList.html',
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

.directive('makeEditable', function(){
	return {
		restrict: 'AE',
		replace: false,
		scope: true,
		link: function(scope,elem,attrs) {
			//console.log(scope,elem,attrs);
			if(scope.User.userState === 'loggedIn'){
				elem[0].contentEditable = true;
			}
		}

	};
})
.directive('tagSearch', function(){
	return {
		restrict: 'E',
		replace: false,
		templateUrl: '/templates/tagSearch.html'
	};
});