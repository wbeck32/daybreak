angular.module('dayBreak').service('locationService',['$http',function($http){
var dayLocArray = [];

this.addLocation = function(locName, locDesc, locURL) {
	console.log('lName, locDesc: ',locName,locDesc);
$http({
	method: 'POST',
	url: 	'/api/addlocation',
	data: 	{'locName' : locName,
			'locDesc' : locDesc,
			'locURL' : locURL},
	headers: {'Content-Type': 'application/json'}
	}).success(function(data, status, headers, config){
		console.log('success!');
	}).error(function(data,status,headers,config){
		console.log('failure!');
	});
	};

this.buildLocArray = function(dayLocations) {
	dayLocArray = dayLocations;
};

}]);
