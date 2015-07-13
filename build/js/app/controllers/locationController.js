angular.module('dayBreak').controller('locationController',['$http','locationService',function($http,locationService){
console.log('in loco controller');

this.enterName = function() {
	var name=this.locationName;
	console.log('hello location name: ',name);
	locationService.getName(name);
	//tripService.addDay(name);
};

}]);