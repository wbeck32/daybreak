angular.module('dayBreak').controller('locationController',['$http','$scope','$rootScope','dayService',function($http,$scope,$rootScope,dayService){

$rootScope.dayLocations = [];
$scope.locName = '';
$scope.locURL = '';
$scope.locDesc = '';

	//TODO: fix latlong so that it is bound to US not Australia
	var defaultBounds = new google.maps.LatLngBounds(
  		new google.maps.LatLng(-33.8902, 151.1759),
  		new google.maps.LatLng(-33.8474, 151.2631));

	var input = document.getElementById('pac-input');

	var searchBox = new google.maps.places.SearchBox(input, {
  		bounds: defaultBounds
	});

	google.maps.event.addListener(searchBox, 'places_changed', function() {
    	var places = searchBox.getPlaces();

	$scope.locName = places[0].name;
	$scope.locURL = places[0].website;
	$scope.$apply();
});

this.addLoc = function(Location,locName,locURL) {
	if(locName){
		$scope.locName = locName;
		$scope.locURL = locURL;
		$scope.locDesc = Location.locDesc;
		console.log('adding another location: ',$scope.locName,$scope.locURL,$scope.locDesc);
		var l = ({location:$scope.locName,url:$scope.locURL,desc:$scope.locDesc});
		$rootScope.dayLocations.push(l);
		var tagField = document.getElementById('tags');
		tagField.value += $scope.locName+','+' ';
		window.localStorage.setItem('dayTags',tagField.value);
		$scope.locDesc = '';
		$scope.locName = '';
		$scope.locURL = '';
		Location.locDesc = '';
		Location.locName = '';
		Location.locURL = '';
	}
};



}]);