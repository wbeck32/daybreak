angular.module('dayBreak').controller('tripController',['$http','tripService',function($http,tripService){


this.enterTrip = function() {
	var tripName=this.tripName;
	var tripGroup = this.tripGroup;
	var tripDesc = this.tripDesc;

	tripService.addDay(tripName, tripGroup, tripDesc);

};

this.showDays = function(){

	var days = this.days;

	tripService.showDays(days);

};

}]);






