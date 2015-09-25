angular.module('dayBreak').controller('dayController', ['$scope', '$rootScope','$http','dayService', 'commonService',  function($scope,$rootScope,$http,dayService,commonService){
//$scope.Day.child = '';
function setDayScope(data) {
	commonService.formatDates(data);
	commonService.tagArrayToString(data);
	$scope.Day.days = data;
}

function completeViewEditUserDays(data){
	//console.log('callback setting found days for user', data);
	commonService.tagArrayToString(data);
	$scope.Day.days = data;  //updates grid with results
	$scope.Day.searchResultLength = data.length;
}

function chosenDay(data) {
	//console.log("data.dayTag", data[0].dayTag);
	commonService.tagArrayToString(data);
	$scope.Day.chosenDay = data[0];
	$scope.User.userDayView = 'single';  
}


dayService.populateDayGrid(setDayScope);

$scope.Day.searchResultLength = 0;
$scope.Day.searchResultsMessage = null;

this.viewEditUserDays = function(username, callback){
	//console.log ('entering viewEditUserDays');
	//console.log('username in daycontroller is ', username);
	$scope.Day.searchResultsMessage='Now Showing My Days Only'; 
	dayService.getDaysOfUser(username, completeViewEditUserDays);
};
 
this.addDay = function(Day, User) { 
	console.log(Day.child);
	var childCheck = '';
	if (Day.child && Day.child == true) {childCheck='checked';}
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
	$scope.User.userFormView = 'hide';   		
	Day.dayName = '';
	Day.dayDesc = '';
};

this.showOneDay = function(dayID){

	console.log('dayID is ooooooooooooooo', dayID);
	
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