angular.module('dayBreak').controller('tripController',['$http','tripService',function($http,tripService){


this.enterTrip = function() {
	var tripName=this.tripName;
	var tripGroup = this.tripGroup;
	var tripDesc = this.tripDesc;
	console.log(tripName);

	tripService.addDay(tripName, tripGroup, tripDesc);

};


}]);






