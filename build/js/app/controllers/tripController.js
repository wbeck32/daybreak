angular.module('dayBreak').controller('tripController',['$http','tripService',function($http,tripService){


this.enterTrip = function() {
	var name=this.tripName;
console.log('hello',this.tripName);
tripService.addDay(name);

};

}]);






