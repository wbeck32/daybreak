angular.module('dayBreak').controller('locationController',['$http','$scope','$sce','$rootScope','dayService','mapService','$compile',function($http,$scope,$sce,$rootScope,dayService,mapService,$compile){

$rootScope.dayLocations = [];
$scope.dayLocations = [];
$scope.locName = '';
$scope.locURL = '';
$scope.locDesc = '';
$scope.locPhotosLg = [];
$scope.locPhotosThumb = [];
$scope.lgPhotoInfo = {};
$scope.googlePlaceId = '';

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
  place = searchBox.getPlace(); console.log('?: ',place);
  document.getElementById('place-id').value = place.place_id;
    $scope.locName = place.name;
    $scope.locURL = place.url;
    if(place && place.photos){
    for (i=0; i<=2; i++){
      $scope.locPhotosThumb.push(place.photos[i].getUrl({'maxWidth':60,'maxHeight':60}));
      $scope.lgPhotoInfo = {  url: place.photos[i].getUrl({'maxWidth':250,'maxHeight':250}), 
                              attr: place.photos[i].html_attributions[0]
                            };
      $scope.locPhotosLg.push($scope.lgPhotoInfo);
    }
  }
geocodePlaceId(geocoder, map, infowindow);
});


function geocodePlaceId(geocoder, map, infowindow) {
  var placeId = document.getElementById('place-id').value;
  $scope.googlePlaceId = document.getElementById('place-id').value;
  geocoder.geocode({'placeId': placeId}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) { 
      //$rootScope.dayLocations.push(results); console.log('0: ',$rootScope.dayLocations);
      if (results[0]) {
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
	if($scope.locName){ 
		$scope.locDesc = Location.locDesc;
		var l = ({location:$scope.locName, url:$scope.locURL, desc:$scope.locDesc, googlePlaceId:$scope.googlePlaceId, photosLg:$scope.locPhotosLg,photosThumb:$scope.locPhotosThumb});
    $rootScope.dayLocations.push(l);
    var tagField = document.getElementById('tags');
    tagField.value += $scope.locName+' ';

    var tempArray = [];
    var locDescArray = [];
    var locTagArray = [];

    tempArray=$scope.locName.split(' ');
    
    if (Location.locDesc){
      locDescArray=Location.locDesc.split(' ');
    }
    Array.prototype.push.apply(tempArray,locDescArray);
    var temp = window.localStorage.getItem('dayTags');
    tempArray.push(temp);
    window.localStorage.setItem('dayTags',tempArray);
    var lL = document.getElementById('locationList');
    lL.innerHTML += "<drag-item><div class='locationCard card-panel'><div class='card-title'>"+$scope.locName+"</div><div class='card-desc'>"+$scope.locDesc+"</div></div></drag-item>";

    $scope.locDesc = '';
		$scope.locName = '';
		$scope.locURL = '';
    $scope.googlePlaceId = '';
    $scope.locPhotosLg = [];
    $scope.locPhotosThumb = [];

    Location.locDesc = '';
		Location.locName = '';
		Location.locURL = '';
	}
};

}]);