angular.module('dayBreak').controller('locationController',['$http','locationService',function($http,locationService){
	var locName; 
	//this.locURL = 'http://www.google.com';

this.locName = function() {
	locName = this.locationName;
	console.log(locName);
	locationService.getName(locName);

};

this.locURL = function(locName){
	console.log('in locURL');
	locationService.getURL(locName);

};


}]);