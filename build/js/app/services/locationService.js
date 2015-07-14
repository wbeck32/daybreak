angular.module('dayBreak').service('locationService',['$http', function($http){
//this.getName = function(name){console.log(name);};


var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(-33.8902, 151.1759),
  new google.maps.LatLng(-33.8474, 151.2631));

var input = document.getElementById('pac-input');

var searchBox = new google.maps.places.SearchBox(input, {
  bounds: defaultBounds
});


google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

console.log('places: ', places);
getURL(places);

});



function getURL(places) {
	console.log('ingetURL: ',places[0].website);
	this.getURL = places[0].website;

}


}]);