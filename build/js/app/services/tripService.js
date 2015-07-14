//build http requests
//example:

  // this.saveTrek = function(loadedTrek){
  //   $http({
  //     method: 'POST',
  //     url:'/api/saveatrek', 
  //     data: {trek: parseTrek(loadedTrek), access_token: window.localStorage.getItem('token')},
  //     headers: {'Content-Type': 'application/json'}
  //   }).success(function(data, status, headers, config){
  //       if (data) {
  //         loadedTrek.id = data;
  //       }
  //   }).error(function(data, status, headers, config){
  //     console.log('failure');
  //   });
  // };

angular.module('dayBreak').service('tripService',['$http', function($http){


this.addDay = function(tripName, tripGroup, tripDesc) {
console.log(name, 'this is where we build the http request to save a trip');
$http({
	method: 'POST',
	url: 	'/api/addday',
	data: 	{'name' : tripName, 
			'group' : tripGroup,
			'desc' : tripDesc},
	headers: {'Content-Type': 'application/json'}	
	}).success(function(data, status, headers, config){
		console.log('success!');
	}).error(function(data,status,headers,config){
		console.log('failure!');

	});
};


}]);
