angular.module('dayBreak').service('tripService',['$http', function($http){


this.addDay = function(tripName, tripGroup, tripDesc) {
console.log(name, 'this is where we build the http request to save a trip');
$http({
	method: 'POST',
	url: 	'/api/addday',
	data: 	{'tripName' : tripName, 
			'tripGroup' : tripGroup,
			'tripDesc' : tripDesc},
	headers: {'Content-Type': 'application/json'}	
	}).success(function(data, status, headers, config){
		console.log('success!');
	}).error(function(data,status,headers,config){
		console.log('failure!');

 		});
	};

this.showDays = function (days){
	$http({
		method: 'GET',
		url:     '/api/show',
		data:  {'days': days},
		headers: {'Content-Type': 'application/json'}
		})
		.success(function(data, status, headers, config){
		console.log('success in showDays!' + data.day[0]);
			var days = data;

		}).error(function(data,status,headers,config){
		console.log('failure in showDays!');

 		});
	};
 
}]);
 
