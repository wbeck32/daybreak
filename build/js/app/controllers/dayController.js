angular.module('dayBreak').controller('dayController', ['$scope', '$rootScope','$http','dayService', 'commonService',  function($scope,$rootScope,$http,dayService,commonService){
$scope.Day.chosenDay = '';
$scope.Day.dayUserName = '';



function setDayScope(data) {
	commonService.formatDates(data);
	commonService.tagArrayToString(data);
	$scope.Day.days = data;
	$scope.User.userDayView = 'grid';
}

function chosenDay(data) { 
	commonService.tagArrayToString(data.data);
	commonService.formatDates(data.data);
	$scope.Day.chosenDay = data;
	$scope.User.userViewSwitch = 'single';  
}

/// switch between two views (templates) one with private info, one without
function showUserProfile(data) {
	
	console.log ("in showUserProfile", data.user.userName);

 	//check to see if this is my profile or not
	$scope.Day.dayUserName = data.user.userName;
	if ($scope.User.username == $scope.Day.dayUserName){
	// 	//display my private info
		console.log('UUU myAccount setting for private  template/view');
		$scope.User.profileSelect('myAccount');

	 } else {
	 	console.log('TTT otherprofile setting for public  template/view');
	 	$scope.User.profileSelect('otherprofile');
 	}
	console.log('display data on the profile page');
}


dayService.populateDayGrid(setDayScope);

$scope.Day.dayWelcomeMsg = '';
$scope.Day.searchResultLength = 0;
$scope.Day.searchResultsMessage = null;

 

this.viewmodel = function(userinput){

	//Daybreak (back to grid view, all users)
	if (userinput === 1){

		User.userViewSwitch='grid';
		User.userService.init(completeInit);
		Day.viewEditUserDays(null); 
		}

	//home (back to grid view, all users)
	if (userinput=== 2){
		
		}
	//register (view register form)
		//register (submit register info)
	if (userinput ===3){
		
		}

		//clear (back to grid view, all users)
	if (userinput=== 4){
		
		}

	//login or ShareYourFavoriteDay (logged out)

		//facebook (logged out) - facebook login 

		if (userinput ==='5'){
		
			}

		//login (logged out) - login 

		if (userinput=== '6'){
		
			}

		//click to recover (logged out) begin pwd recover

		if (userinput ==='7'){
		
			}

		//clear (logged out) (back to grid view, all users)

		if (userinput=== '8'){
		
		}

	//Create New Day  (logged in) (show create new day form)

		if (userinput ==='9'){
		
		}

	// log out (logged in ) (log out and begin )

		if (userinput ==='10'){
		
		}


	// user Account (logged in)

		//about me save  (logged in)

		if (userinput=== '11'){
		
		}

		//change email

		if (userinput=== '12'){
		
		}

		// change password

		if (userinput ==='13'){
		
		}

		// grid view (user days only)

		if (userinput = '14'){
		
		}

		// clear (back to grid view, all users)	

		if (userinput=== '15'){
		
		}

	//tag search (logged in or logged out)

		//search (return search results)

		if (userinput=== '16'){
		
		}

		//show all days (return all days ...)

		if (userinput ==='17'){
		
		}

	// username search (select user name, display user profile with days)

		if (userinput ==='18'){
		
		}

}




 this.viewEditUserDays = function(username){
	console.log ('entering viewEditUserDays');
	console.log('username in daycontroller is ', username);
	
	if(username !== null)
		{$scope.Day.searchResultsMessage='Now Showing Days for '+ username+' Only'; 
		dayService.getDaysOfUser(username, setDayScope);
		}
	else if (username === null)
		{console.log('username is null ***********');
		dayService.populateDayGrid(setDayScope);
		}
	 
};

 
//get a selected user profile
this.getUserProfile = function(username){
	console.log("currrent user name ******", username);
	$scope.User.userViewSwitch = 'profile';
	

	dayService.userProfile(username, showUserProfile);

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