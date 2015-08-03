angular.module('dayBreak',[]).directive('addLocation', function(){

return {
	restrict: 'AEC',
	replace:true,
	template:'<p data-ng-click="clearMessage()">Nooooo! {{message}}</p>',
	link: function( scope, elem, attrs) { console.log(elem);
		scope.$watch('message', function(value) { 
			console.log(' Message Changed!'); 
		}); 

		scope.clearMessage = function() { 
			scope.message = '';
		}
	
		elem.bind(' mouseover', function() { 
			elem.css(' cursor', 'pointer'); 
		});
	}
}
});