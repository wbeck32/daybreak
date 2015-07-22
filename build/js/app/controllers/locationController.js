angular.module('dayBreak').controller('locationController',['$http','$scope',function($http,$scope){
	$scope.locName = '';
	$scope.locURL = '';

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
	// $scope.FORMS = [
	// // {locName:''}
	//  ];

	this.addLoc = function(Location) {
console.log('Location: ',Location);
		var locName=this.locName;
		console.log('adding another location: ',locName);


	}

}]);