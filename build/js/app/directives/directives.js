angular.module('dayBreak').directive('locationList', function(){

return {
	restrict: 'E',
	replace: false,
	scope: true,
	templateUrl:'/locationList.html',
	 link: function( scope, elem, attrs) {
 	 }
};

});