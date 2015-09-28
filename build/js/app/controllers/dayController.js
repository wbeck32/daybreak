angular.module('dayBreak').controller('dayController', ['$scope', '$rootScope','$http','dayService', 'commonService',  function($scope,$rootScope,$http,dayService,commonService){
$scope.Day.chosenDay = '';

function setDayScope(data) {
	commonService.formatDates(data);
	commonService.tagArrayToString(data);
	$scope.Day.days = data;
	$scope.User.userDayView = 'grid';
}

function chosenDay(data) { console.log('data: ',data);
	commonService.tagArrayToString(data);
	$scope.Day.chosenDay = data;
	$scope.User.userDayView = 'single';  
}

function showUserProfile(data) {
	//check to see if this is my profile or not

	// if ($scope.User.username == data.user.userName){
	// 	//display my private info
	// } else {
	// 	//someone else's profile
	// }
	//viewswitch becomes profile
	console.log(data);
	console.log('display data on the profile page');
}


dayService.populateDayGrid(setDayScope);

$scope.Day.dayWelcomeMsg = '';
$scope.Day.searchResultLength = 0;
$scope.Day.searchResultsMessage = null;
$scope.Day.dayUserName = '';

this.getUserProfile = function(username){
	dayService.userProfile(username, showUserProfile);

};

this.viewEditUserDays = function(username, callback){
	//console.log ('entering viewEditUserDays');
	//console.log('username in daycontroller is ', username);
	$scope.Day.searchResultsMessage='Now Showing My Days Only'; 
	dayService.getDaysOfUser(username, setDayScope);
};
 
this.addDay = function(Day, User) { 
	console.log(Day.child);
	var childCheck = '';
	if (Day.child && Day.child === true) {childCheck='checked';}
	console.log(childCheck);
	var dayName=Day.dayName;
	var userName=User.username;
	var dayDesc = Day.dayDesc;
	var dayTags = window.localStorage.getItem('dayTags');
	var dayChild = childCheck;
	var dayTeen = Day.teen;
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
	//$scope.User.userFormView = 'hide';   		
	Day.dayName = '';
	Day.dayDesc = '';
};

this.showOneDay = function(dayID){
	//console.log('dayID is', dayID);
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