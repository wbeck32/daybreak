angular.module('dayBreak').controller('locationController',['$http','$scope','$sce','$rootScope','dayService','mapService',function($http,$scope,$sce,$rootScope,dayService,mapService){

$rootScope.dayLocations = [];
$scope.locName = '';
$scope.locURL = '';
$scope.locDesc = '';
$scope.locLatLng = '';
$scope.locPhotosLg = [];
$scope.locPhotosThumb = [];
$scope.lgPhotoInfo = {};

var myLatlng = new google.maps.LatLng(-33.867957, 151.21117600000002);
var mapOptions = {
  zoom: 14,
  center: myLatlng,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}; 

$scope.map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(-33.8902, 151.1759),
  new google.maps.LatLng(-33.8474, 151.2631));


var input = document.getElementById('pac-input');

var searchBox = new google.maps.places.Autocomplete(input, {

});
//var searchBox = new google.maps.places.SearchBox(input, {
    //bounds: defaultBounds
//});

google.maps.event.addListener(searchBox, 'place_changed', function() { 
    var place = searchBox.getPlace(); console.log(place);
    // var lat = places[0].geometry.location.G;
    // var lon = places[0].geometry.location.K;
    var lat = place.geometry.location.H;
    var lon = place.geometry.location.L;
    var myLatLong = ({lat:lat,lng:lon});
    var markerBounds = new google.maps.LatLngBounds();
    var newLatLong = new google.maps.LatLng(myLatLong);
    var marker = new google.maps.Marker({
      position: myLatLong,
      title: place.name,
      animation: google.maps.Animation.DROP
    });
  $scope.map.panTo(marker.position);

var popupString = '<div style="font-weight:bold">'+place.name+'</div>';

if (place.formatted_address) {
  popupString += '<div>'+place.formatted_address+'</div>';
}
if (place.formatted_phone_number) {
  popupString += '<div>'+place.formatted_phone_number+'</div>';
}

var infowindow = new google.maps.InfoWindow({
  content: popupString
});
marker.setMap($scope.map);

marker.addListener('click', function() {
	infowindow.open($scope.map, marker);
});

//console.log(places[0]);
$scope.locName = place.name;
$scope.locURL = place.website;
$scope.locLatLng = myLatLong;

if(place.photos){
  for (i=0; i<=2; i++){
    $scope.locPhotosThumb.push(place.photos[i].getUrl({'maxWidth':60,'maxHeight':60}));
    $scope.lgPhotoInfo = {  url: place.photos[i].getUrl({'maxWidth':250,'maxHeight':250}), 
                            attr: place.photos[i].html_attributions[0]
                          };
    $scope.locPhotosLg.push($scope.lgPhotoInfo);
  }
}

$scope.$apply();

});


this.addLoc = function(Location,locName,locURL) { 
	if(locName){
		$scope.locName = locName;
		$scope.locURL = locURL;
		$scope.locDesc = Location.locDesc;

		var l = ({location:$scope.locName, url:$scope.locURL, desc:$scope.locDesc, latLong:$scope.locLatLng, photosLg:$scope.locPhotosLg,photosThumb:$scope.locPhotosThumb});
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
    console.log(lL);
    lL.innerHTML += "<div draggable>
      <div class='locationCard card-panel'>
        <div class='card-title'>"+$scope.locName+"</div>
        <div class='card-desc'>"+$scope.locDesc+"</div>
      </div>
    </div>";

    $scope.locDesc = '';
		$scope.locName = '';
		$scope.locURL = '';
    $scope.locLatLng = '';
    $scope.locPhotosLg = [];
    $scope.locPhotosThumb = [];
		Location.locDesc = '';
		Location.locName = '';
		Location.locURL = '';
	}
};






}]);