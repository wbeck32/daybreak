angular.module('dayBreak').controller('dayController', ['$scope', '$rootScope','$http','dayService', 'commonService',  function($scope,$rootScope,$http,dayService,commonService){

function setDayScope(data) {
	//console.log(data);
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
	var dayName=Day.dayName;
	var userName=User.username;
	var dayDesc = Day.dayDesc;
	var dayGroup = Day.dayGroup;
	var dayTags = window.localStorage.getItem('dayTags');
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

	dayService.addDay(dayName, userName, dayDesc, dayGroup, $rootScope.dayLocations, tagArray, setDayScope);
	$scope.User.userDayView = 'grid';
	dayService.populateDayGrid(setDayScope);
	$scope.User.userFormView = 'hide';   		
	Day.dayName = '';
	Day.dayDesc = '';
};

this.showOneDay = function(dayID){
	dayService.getDay(dayID, chosenDay);
};

}]);