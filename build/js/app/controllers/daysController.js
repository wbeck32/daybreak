angular.module('dayBreak').controller('daysController', 
	['$scope', '$http', function($scope, $http){

	console.log("begin - daysController loaded");

		$http({
			method: 'GET',
			url: '/api/show',
			headers: {'Content-Type' : 'application/json'}
		})
		.success(function(data,status,headers, config){
			console.log("success ***");
			$scope.days = data;
			})
		.error(function(data, status,headers,config){
			console.log("failure ***");
			});
 
}]);