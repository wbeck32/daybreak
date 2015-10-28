angular
  .module('dayBreak')
  .controller('locationController',['$http','$scope','$sce','$rootScope','dayService','mapService','$compile', function($http,$scope,$sce,$rootScope,dayService,mapService,$compile){

$rootScope.dayLocations = [];
$rootScope.dayTags = [];

var locPhotosLg = [];
var locPhotosThumb = [];
var lgPhotoInfo = {};
var locName = '';
var locURL = '';
var locDesc = '';
var googlePlaceId = '';
var locLatLong = '';


var myLatlng = new google.maps.LatLng(-33.867957, 151.21117600000002);
var mapOptions = {
  zoom: 14,
  center: myLatlng,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}; 

map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(-33.8902, 151.1759),
  new google.maps.LatLng(-33.8474, 151.2631));
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.Autocomplete(input, {
  });


var geocoder = new google.maps.Geocoder;
var infowindow = new google.maps.InfoWindow;
var place;

google.maps.event.addListener(searchBox, 'place_changed', function() { 
  place = searchBox.getPlace();
  document.getElementById('place-id').value = place.place_id;
    locName = place.name;
    locURL = place.url;
    if(place && place.photos){
    for (i=0; i<=place.photos.length; i++){console.log('ppl: ', place.photos.length);
      locPhotosThumb.push(place.photos[i].getUrl({'maxWidth':60,'maxHeight':60}));
      lgPhotoInfo = {  url: place.photos[i].getUrl({'maxWidth':250,'maxHeight':250}), 
                              attr: place.photos[i].html_attributions[0]
                            };
      locPhotosLg.push(lgPhotoInfo);
    }
  }
geocodePlaceId(geocoder, map, infowindow);
});


function geocodePlaceId(geocoder, map, infowindow) {
  var placeId = document.getElementById('place-id').value;
  googlePlaceId = document.getElementById('place-id').value;
  geocoder.geocode({'placeId': placeId}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) { 
      if (results[0]) {
        locLatLong = results[0].geometry.location;
        map.setZoom(11);
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          animation: google.maps.Animation.DROP
        });

        var popupString = '<div style="font-weight:bold">'+results[0].formatted_address+'</div>';

        if (results[0].formatted_phone_number) {
          popupString += '<div>'+results[0].formatted_phone_number+'</div>';
        }
        if (place.url) {
          popupString += '<div><a href='+place.url+'">URL</a></div>';
        }
        infowindow.setContent(popupString);
        infowindow.open(map, marker);

      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}


this.addLoc = function(Location,locDesc) {
	var tags = [];
    if(locName){
        locDesc = Location.locDesc;
        var l = ({location: locName, url: locURL, desc: locDesc, locLatLong: locLatLong, googlePlaceId:googlePlaceId, photosLg:locPhotosLg, photosThumb:locPhotosThumb});
        $rootScope.dayLocations.push(l);

	    var tempArray = locDesc.split(' ');
        tempArray.push(locName+' ');
		tempArray.forEach(function(v,i,a){
			$rootScope.dayTags.push(v);

		});

        var tagField = document.getElementById('tags');
        tagField.value += locName+' ';

	    var lL = document.getElementById('locationList');
        lL.innerHTML += "<drag-item><div class='locationCard card-panel'><div class='card-title'>"+locName+"</div><div class='card-desc'>"+locDesc+"</div></div></drag-item>";
		document.getElementById('pac-input').value ='';
	    Location.locDesc = '';
		Location.locName = '';
		Location.locURL = '';
	}

  //locationFactory.buildObject(dayLocations);
};

}]);