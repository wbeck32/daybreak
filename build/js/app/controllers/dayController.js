angular.module('dayBreak').controller('dayController', ['$scope', '$rootScope','$http','dayService', 'commonService',  function($scope,$rootScope,$http,dayService,commonService){
$scope.Day.chosenDay = '';
$scope.Day.dayUserName = '';


function setDayScope(data) {
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

function showUserProfile(data) {
	
	console.log ("in showUserProfile", data.user.userName);

 	//check to see if this is my profile or not
	$scope.Day.dayUserName = data.user.userName;
	if ($scope.User.username == $scope.Day.dayUserName){
	// 	//display my private info
		console.log('777777 username and dayusername match');
		$scope.User.profileSelect('myAccount');

	 } else {
	 			console.log('8888888 username and dayusername NO MATCH');

	 	$scope.User.profileSelect('otherprofile')

 	}

	console.log('display data on the profile page');
}


dayService.populateDayGrid(setDayScope);

$scope.Day.dayWelcomeMsg = '';
$scope.Day.searchResultLength = 0;
$scope.Day.searchResultsMessage = null;

this.addNewDay = function() {
	//initializes add day form
	$scope.User.userViewSwitch = 'single';
	$scope.User.userAddDay = true;
	$scope.Day.dayWelcomeMsg = 'Tell us about your day!';
}


this.getUserProfile = function(username){
	console.log("currrent user name ******", username);
	$scope.User.userViewSwitch = 'profile';
	dayService.userProfile(username, showUserProfile);

};

this.viewEditUserDays = function(username, callback){
	//console.log ('entering viewEditUserDays');
	//console.log('username in daycontroller is ', username);
	$scope.Day.searchResultsMessage='Now Showing My Days Only'; 
	dayService.getDaysOfUser(username, setDayScope);
};
 
this.addDay = function(Day, User) { 
	var childCheck = '';
	if (Day.child && Day.child === true) {childCheck='checked';}
	var teenCheck = '';
	if (Day.teen && Day.teen === true) {teenCheck='checked';}
	var dayName=Day.dayName;
	var userName=User.username;
	var dayDesc = Day.dayDesc;
	var dayTags = window.localStorage.getItem('dayTags');
	var dayChild = childCheck;
	var dayTeen = teenCheck;
	var tagArray = [];
	var dayDescArray= [];
	var dayNameArray= [];

	if(dayTags) {
 		tagArray = dayTags.split(',');
 	} 
 	if (dayDesc){
		dayDescArray = dayDesc.split(' ');
		Array.prototype.push.apply(tagArray,dayDescArray);
	} 
	if (dayName) {
		dayNameArray = dayName.split(' ');
		Array.prototype.push.apply(tagArray,dayNameArray);
	}

	dayService.addDay(dayName, userName, dayDesc, $rootScope.dayLocations, tagArray, dayChild, dayTeen, setDayScope);
	$scope.User.userDayView = 'grid';
	dayService.populateDayGrid(setDayScope);
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

function completeUpdateDay(){
	console.log('completeSaveDayChanges in callback');
}


this.updateDay = function(Day, User){
	console.log('saveDayChanges controller - values of Day.chosenDay');

	//console.log(Day.chosenDay.username);
	//console.log(Day.chosenDay._id);

	console.log(Day.chosenDay.dayName);
	console.log(Day.chosenDay.dayDesc);


	dayService.saveDayChanges(Day,User,completeUpdateDay);
};
 
}]);