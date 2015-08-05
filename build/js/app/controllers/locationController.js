angular.module('dayBreak').controller('locationController',['$http','$scope','dayService',function($http,$scope,dayService){
		
	$scope.message='';
	$scope.locName = '';
	$scope.locURL = '';
	var dayLocations = [];


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

	this.addLoc = function(Location){
		if(Location.locName){
			var locName = $scope.locName;
			var locDesc = Location.locDesc;
//			$scope.locDesc = locDesc;
			var locURL = $scope.locURL;
			console.log('adding another location: ',locName,locDesc,locURL);
			var l = ({location:locName,desc:locDesc,url:locURL});
			dayLocations.push(l);
			dayService.grabLocs(dayLocations);
			var tagField = document.getElementById('tags');
			tagField.value += locName+','+' ';
			window.localStorage.setItem('dayTags',tagField.value);
			Location.locName='';
			Location.locURL = '';
			Location.locDesc = '';
			$scope.locName = '';
			$scope.locURL = '';
		}
	};

}]);