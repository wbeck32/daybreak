angular.module('dayBreak').controller('dayController', ['$scope', '$rootScope','$http','dayService',  function($scope,$rootScope,$http,dayService){

// this.makeEditable = function() {
	
// 	console.log('change it!');

// }

function tagArrayToString(data){
	Object.keys(data).forEach(function(key){
		var tagString = '';
		data[key].dayTags.forEach(function(elem){
			tagString += ', '+elem;
		}); 
		tagString = tagString.substr(2);
		data[key].dayTags = tagString;
	});	
	return data;
}

function setDayScope(data) {
	tagArrayToString(data);
	$scope.Day.days = data;
}

dayService.populateDayGrid(setDayScope);

$scope.Day.searchResultLength = 0;
$scope.Day.searchResultsMessage = null;

function updateDayGrid(data) {
	console.log('data: ',data);
	$scope.Day.days = data;
}

function completeViewEditUserDays(data){
	console.log('callback setting found days for user', data);
	tagArrayToString(data);
	$scope.Day.days = data;  //updates grid with results
	$scope.Day.searchResultLength = data.length;
}

this.viewEditUserDays = function(username, callback){
	console.log ('entering viewEditUserDays');
	console.log('username in daycontroller is ', username);
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

	dayService.addDay(dayName, userName, dayDesc, dayGroup, $rootScope.dayLocations, tagArray, updateDayGrid);
	dayService.populateDayGrid(setDayScope);
	$scope.User.userFormView = 'hide';    		
	Day.dayName = '';
	Day.dayDesc = '';
};

function chosenDay(data) {
		//console.log("data.dayTag", data[0].dayTag);
		tagArrayToString(data);
 		$scope.Day.chosenDay = data[0];
		$scope.User.userDayView = 'single';  
}


this.showOneDay = function(dayID){
	dayService.getDay(dayID, chosenDay);
};

}]);