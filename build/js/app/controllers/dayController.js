angular.module('dayBreak').controller('dayController', ['$scope', '$rootScope', '$http', 'dayService', 'commonService', function ($scope, $rootScope, $http, dayService, commonService) {
	$scope.Day.chosenDay = '';
	$scope.Day.dayUserName = '';

	//public profile info for other user, not logged in user
	$scope.Day.otherusername = '';
	$scope.Day.othercreated = '';
	$scope.Day.otheruserabout = '';

	$scope.Day.dayUserName = '';   //added to reset after clear from delete account?
	$scope.Day.dayWelcomeMsg = '';
	$scope.Day.searchResultLength = 0;
	$scope.Day.searchResultsMessage = null;

	///TODO: REPLACE WITH getDaysOfUser !!! ////////////////////
	//dayService.populateDayGrid(setDayScope);//moved to top - executes when dayController
	var username = null;


	//dayService.getDaysOfUser(username,setDayScope);
	dayService.userProfile(username, showUserProfile);

////////////////////////////////////////////////////////////////
///THIS IS NO LONGER USED except for day creation!!!
// INTEGRATE commonService lines to showUserProfile
	function showAddedDay(data) {
		commonService.formatDates(data);
		commonService.tagArrayToString(data);
		$scope.Day.days = data;
		$scope.User.userViewSwitch = 'grid';
	}

	function chosenDay(data) {
		commonService.tagArrayToString(data.data);
		commonService.formatDates(data.data);

		var geocoder = new google.maps.Geocoder();
		var infowindow = new google.maps.InfoWindow();

		var locPins = data.data[0].locations;
		locPins.forEach(function (v, i, a) {
			if (a[i].googlePlaceId) {
				geocoder.geocode({'placeId': a[i].googlePlaceId}, function (results, status) {
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

							var popupString = '<div style="font-weight:bold">' + results[0].formatted_address + '</div>';

							if (results[0].formatted_phone_number) {
								popupString += '<div>' + results[0].formatted_phone_number + '</div>';
							}
							if (results[0].url) {
								popupString += '<div><a href=' + place.url + '">URL</a></div>';
							}
							infowindow.setContent(popupString);
							infowindow.open(map, marker);

						} else {
							console.log('No results found');
						}
					} else {
						console.log('Geocoder failed due to: ' + status);
					}
				});

			}
		});
		$scope.Day.chosenDay = data;
		$scope.User.userViewSwitch = 'single';
	}


////////////////////////////////////////////////////////////////////////
/// CALLBACK switch between two views (templates, public/private) AND set user profile data
	function showUserProfile(response) {
		commonService.formatDates(response.days);  //TODO - NOT YET WORKING
		commonService.tagArrayToString(response.days);
		if ($scope.User.username === response.user.userName) {
			$scope.User.profileMode = 'myAccount';  //sets view template
			$scope.Day.days = response.days; //set incoming day array to scope Days

			//CASE: USER REQUESTS OTHER ACCOUNT PROFILE
		}
		else if ($scope.User.username !== response.user.userName && typeof response.user.userName !== "undefined") {
			$scope.User.profileMode = 'otherprofile';  //sets view template
			// commonService.formatDates(response.days);  //TODO - NOT YET WORKING
			// commonService.tagArrayToString(response.days);
			$scope.Day.days = response.days;    //set incoming day array to scope Days

			//set otherprofile info
			$scope.Day.otherusername = response.user.userName;
			$scope.Day.othercreated = response.user.created.substring(0, 10);

			$scope.Day.otheruserabout = response.user.userAbout;
		}

		//CASE: NO USERNAME REQUESTED SHOW ALL
		else if (typeof response.user.userName == "undefined") {
			$scope.User.userViewSwitch = 'grid';
			$scope.User.profileMode = null;
			$scope.Day.days = response.days;
		}
	}


	this.addNewDay = function () {
		//initializes add day form
		$scope.User.userViewSwitch = 'single';
		$scope.User.userAddDay = true;
		$scope.Day.dayWelcomeMsg = 'Tell us about your day!';
	};


	this.getUserProfile = function (username) {
		//console.log("currrent user name ******", username);
		$scope.User.userViewSwitch = 'profile';
		dayService.userProfile(username, showUserProfile);
	};

	this.addDay = function (Day, User) {
		var childCheck = '';
		if (Day.child && Day.child === true) {
			childCheck = 'checked';
		}
		var teenCheck = '';
		if (Day.teen && Day.teen === true) {
			teenCheck = 'checked';
		}
		var tagArray = [];
		if (typeof $rootScope.dayTags === 'object') {
			tagArray = $rootScope.dayTags;
		} else if (typeof $rootScope.dayTags === 'string') {
			tagArray = $rootScope.dayTags.split(',');
		}
		var dayName = Day.dayName;
		var userName = User.username;
		var dayDesc = Day.dayDesc;
		var dayChild = childCheck;
		var dayTeen = teenCheck;
		var dayDescArray = [];
		var dayNameArray = [];
		var userDeactivated = false;

		dayService.addDay(dayName, userName, userDeactivated, dayDesc, $rootScope.dayLocations, tagArray, dayChild, dayTeen);

		User.userViewSwitch = 'grid';
		$rootScope.dayTags = [];
		Day.dayName = '';
		Day.dayDesc = '';
	};

	this.showOneDay = function (dayID) {
		$scope.User.userAddDay = false;
		dayService.getDay(dayID, chosenDay);
	};


	this.closeSingleDayNoSave = function () {
		$scope.User.userDayView = 'grid';
	};

	function completeUpdateDay(data) {
		$scope.data = data;
		User.userViewSwitch = 'grid';
		$scope.User.userMessage = 'Your changes have been saved.';
	}


	this.updateDay = function (Day, User) {
		var thisDay = $scope.Day.chosenDay.data[0];  //console.log(thisDay.locations);
		thisDay.locations.push($rootScope.dayLocations);	//console.log('thisDay: ',thisDay.locations)
		var tmp = thisDay.locations.concat($rootScope.dayLocations);
		thisDay.locations = [];
		tmp.forEach(function (elem, index, array) {
			if (typeof elem === 'object' && elem.location) {
				thisDay.locations.push(elem);
			}
		});
		dayService.saveDayChanges(thisDay, User, completeUpdateDay);
		User.userViewSwitch = 'grid';
};

}]);
