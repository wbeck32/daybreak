angular.module('dayBreak').service('tripService',['$http', function($http){


this.addDay = function(name) {
console.log(name, 'this is where we build the http request to save a trip');
$http({
	method: 'POST',
	url: 	'/api/addday',
	data: {'name' : name},
	headers: {'Content-Type': 'application/json'}	
	}).success(function(data, status, headers, config){
		console.log('success!');
	}).error(function(data,status,headers,config){
		console.log('failure!');

 		});
	};
}]);
 
