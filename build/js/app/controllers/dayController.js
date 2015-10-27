angular.module('dayBreak').controller('dayController', ['$scope', '$rootScope','$http','dayService', 'commonService','userService','locationService','locationFactory',  function($scope,$rootScope,$http,dayService,commonService,userService,locationService,locationFactory){
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
	 var username=null;
	 

	 //dayService.getDaysOfUser(username,setDayScope);
	 dayService.userProfile(username, showUserProfile);


	 //console.log("1111111 first call of getDaysOfUser");


////////////////////////////////////////////////////////////////
///THIS IS NO LONGER USED except for day creation!!!  
// INTEGRATE commonService lines to showUserProfile
function showAddedDay(data) {
	// console.log('setDayScope indayController on callback');
	// console.log('setDayScope in dayController data is', data);
  	console.log('setDayScope  data.days',  data);
	// console.log('setDayScope data.user:',  data.user);
	// console.log('setDayScope ::::end data');
	commonService.formatDates(data);
	commonService.tagArrayToString(data);
	$scope.Day.days = data;
	$scope.User.userViewSwitch = 'grid';	
 }



function chosenDay(data) { 
	commonService.tagArrayToString(data.data);
	commonService.formatDates(data.data);
	$scope.Day.chosenDay = data;
	$scope.User.userViewSwitch = 'single';  
}


////////////////////////////////////////////////////////////////////////
/// CALLBACK switch between two views (templates, public/private) AND set user profile data
function showUserProfile(response) {
	//brought in from setDayScope because this is new unified callback	
	// console.log ("EEEEE in showUserProfile", response);
	//console.log ("FFFFFF in showUserProfile response", response.user.userName);

	commonService.formatDates(response.days);  //TODO - NOT YET WORKING
	commonService.tagArrayToString(response.days);
	//if(response.user) {
 	//CASE: USER REQUESTS OWN ACCOUNT PROFILE
 	if ($scope.User.username === response.user.userName){
		// console.log ("EEEEEE in showUserProfile response.user", response.user);
		// console.log ("EEEEEE in showUserProfile response.user.created", response.user.created);
		// console.log ("EEEEEE in showUserProfile response.user.userName", response.user.userName);
	 	// commonService.formatDates(response.days);  //TODO - NOT YET WORKING
		// commonService.tagArrayToString(response.days);
		$scope.User.profileMode='myAccount';  //sets view template
		$scope.Day.days = response.days; //set incoming day array to scope Days 

  	//CASE: USER REQUESTS OTHER ACCOUNT PROFILE
  	} 
  	else if ($scope.User.username !== response.user.userName && typeof response.user.userName !== "undefined") 
	{ 
 	 	$scope.User.profileMode='otherprofile';  //sets view template
 		// commonService.formatDates(response.days);  //TODO - NOT YET WORKING
		// commonService.tagArrayToString(response.days);
	 	$scope.Day.days = response.days;    //set incoming day array to scope Days 

	 	//set otherprofile info
	 	$scope.Day.otherusername = response.user.userName;
	 	$scope.Day.othercreated = response.user.created;
	 	$scope.Day.otheruserabout = response.user.userAbout;
	}  	

	//CASE: NO USERNAME REQUESTED SHOW ALL
	else if (typeof response.user.userName == "undefined" ){
		$scope.User.userViewSwitch = 'grid';
		$scope.User.profileMode = null;
		$scope.Day.days = response.days; 
	}
}
	
 
this.addNewDay = function() {
	//initializes add day form
	$scope.User.userViewSwitch = 'single';
	$scope.User.userAddDay = true;
	$scope.Day.dayWelcomeMsg = 'Tell us about your day!';
};


this.getUserProfile = function(username){
	//console.log("currrent user name ******", username);
	$scope.User.userViewSwitch = 'profile';
 	dayService.userProfile(username, showUserProfile);
};

this.addDay = function(Day, User) {  console.log($rootScope.dayTags);
	var childCheck = '';
	if (Day.child && Day.child === true) {childCheck='checked';}
	var teenCheck = '';
	if (Day.teen && Day.teen === true) {teenCheck='checked';}
	var dayName=Day.dayName;
	var userName=User.username;
	var dayDesc = Day.dayDesc;
	//var dayTags = $rootScope.dayTags;
	var dayChild = childCheck;
	var dayTeen = teenCheck;
	var tagArray = [];
	var dayDescArray= [];
	var dayNameArray= [];
	var userDeactivated = false;

	var tmp = []; console.log($rootScope.dayTags);
	$rootScope.dayTags.forEach(function(e,i,a) {
		e.forEach(function(e,i,a){			//console.log(e);

			tmp.push(e);
		});
		tmp.forEach(function(e,i,a){
			e = e.split(' ');
			$rootScope.dayTags.push(e);
		});
		$rootScope.dayTags.forEach(function(e,i,a){
			if ($rootScope.dayTags.indexOf(e) > -1) {
				//console.log(e);
			}
		})
		});
	//});//console.log(tmp);


console.log($rootScope.dayTags);
	// if(dayTags) {
 // 		tagArray = dayTags.split(',');
 // 	} 
 // 	if (dayDesc){
	// 	dayDescArray = dayDesc.split(' ');
	// 	Array.prototype.push.apply(tagArray,dayDescArray);
	// } 
	// if (dayName) {
	// 	dayNameArray = dayName.split(' ');
	// 	Array.prototype.push.apply(tagArray,dayNameArray);
	// }
	//dayService.addDay(dayName, userName, userDeactivated, dayDesc, $rootScope.dayLocations, $rootScope.dayTags, dayChild, dayTeen);
	$scope.User.userDayView = 'grid';
	$rootScope.dayTags = [];
	//window.localStorage.removeItem('dayTags');
	Day.dayName = '';
	Day.dayDesc = '';
};

this.showOneDay = function(dayID){
	$scope.User.userAddDay = false;
	dayService.getDay(dayID, chosenDay);
};

 
this.closeSingleDayNoSave = function(){
	$scope.User.userDayView = 'grid';  
};

function completeUpdateDay(data){
	console.log('completeSaveDayChanges in callback: ', data);
	window.localStorage.removeItem('dayTags');
	$scope.User.userViewSwitch = 'grid';
	$scope.User.userMessage = 'Your changes have been saved.';
}


this.updateDay = function(Day, User){
	console.log('updating day: ',$rootScope.dayLocations);//new loc
	console.log('day: ',$scope.Day.chosenDay.data[0].locations);//orig locs
	var thisDay = $scope.Day.chosenDay.data[0];  //console.log(thisDay.locations);
	thisDay.locations.push($rootScope.dayLocations);	//console.log('thisDay: ',thisDay.locations)
	var tmp = thisDay.locations.concat($rootScope.dayLocations);
	thisDay.locations = [];
	tmp.forEach(function(elem,index,array){
		if(typeof elem === 'object' && elem.location) {
			console.log(elem);
			thisDay.locations.push(elem);
		}

		//});
	});console.log('final answer: ',thisDay.locations);
	dayService.saveDayChanges(thisDay, User, completeUpdateDay);
};
 
}]);