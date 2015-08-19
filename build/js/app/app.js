var dayBreak = angular.module('dayBreak',[], function(){
});

dayBreak.controller('newController', 
	['$scope', function($scope){

	$scope.message="************* hello ****************";
	console.log($scope);


}]);
