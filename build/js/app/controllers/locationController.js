angular.module('dayBreak').controller('locationController',['$http','$scope','$rootScope','dayService','mapService',function($http,$scope,$rootScope,dayService,mapService){

$rootScope.dayLocations = [];
$scope.locName = '';
$scope.locURL = '';
$scope.locDesc = '';

var myLatlng = new google.maps.LatLng(-33.867957, 151.21117600000002);
var mapOptions = {
  zoom: 14,
  center: myLatlng,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}; 

$scope.map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.SearchBox(input, {
    //bounds: defaultBounds
});

google.maps.event.addListener(searchBox, 'places_changed', function() { 
    var places = searchBox.getPlaces(); console.log(places[0]);
    // var lat = places[0].geometry.location.G;
    // var lon = places[0].geometry.location.K;
    var lat = places[0].geometry.location.H;
    var lon = places[0].geometry.location.L;
    var myLatLong = ({lat:lat,lng:lon});
    var markerBounds = new google.maps.LatLngBounds();
    var newLatLong = new google.maps.LatLng(myLatLong);
    var marker = new google.maps.Marker({
      position: myLatLong,
      title: places[0].name,
      animation: google.maps.Animation.DROP
    });
  $scope.map.panTo(marker.position);

var popupString = '<div style="font-weight:bold">'+places[0].name+'</div>';

if (places[0].formatted_address) {
  popupString += '<div>'+places[0].formatted_address+'</div>';
}
if (places[0].formatted_phone_number) {
  popupString += '<div>'+places[0].formatted_phone_number+'</div>';
}

var infowindow = new google.maps.InfoWindow({
  content: popupString
});
marker.setMap($scope.map);

marker.addListener('click', function() {
	infowindow.open($scope.map, marker);
});

$scope.locName = places[0].name;
$scope.locURL = places[0].website;
$scope.$apply();

});


this.addLoc = function(Location,locName,locURL) {
	if(locName){
		$scope.locName = locName;
		$scope.locURL = locURL;
		$scope.locDesc = Location.locDesc;

		var l = ({location:$scope.locName, url:$scope.locURL, desc:$scope.locDesc});
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

    $scope.locDesc = '';
		$scope.locName = '';
		$scope.locURL = '';
		Location.locDesc = '';
		Location.locName = '';
		Location.locURL = '';
	}
};



}]);