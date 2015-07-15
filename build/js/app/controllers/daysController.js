<<<<<<< HEAD
angular.module('dayBreak').controller('daysController', ['$scope', '$http',function($scope, $http){
	
	$http({
		method: 'GET',
		url: 	'/api/show',
		headers: {'Content-Type': 'application/json'}	
	}).success(function(data, status, headers, config){
		console.log('success!');
		$scope.days = data;
	}).error(function(data,status,headers,config){
		console.log('failure!');
 	});
=======
angular.module('dayBreak').controller('daysController', ['$scope', '$http', function($scope, $http){
		$http({
			method: 'GET',
			url: '/api/show',
			headers: {'Content-Type' : 'application/json'}
		})
		.success(function(data,status,headers, config){
			console.log("success");
			$scope.days = data;
			})
		.error(function(data, status,headers,config){
			console.log("failure");
			});
>>>>>>> 01298d78b27e74181642d2a8f0fd103819a4f045
}]);