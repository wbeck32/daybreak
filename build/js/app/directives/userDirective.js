//directive userDirective.js
angular.module('dayBreak').directive('userDirective', function(){

return {
	restrict: 'AEC',
	replace: true,
	template:'userLoginRegistrationTEST.html',

	link: function( scope, elem, attrs) { 
		console.log(elem + " is elem");
		
		scope.$watch('message', function(value) { 
			console.log(' Message Changed In Some Way!'); 
		}); 

		scope.clearMessage = function() { 
			scope.message = '';
		};
		elem.bind(' mouseover', function() { 
			elem.css('color', 'red'); 
		});
		elem.bind('mouseout', function(){
			elem.css('color','blue');
 		});
	}
};
});