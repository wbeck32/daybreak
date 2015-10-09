angular.module('dayBreak').controller('dayController', ['$scope', '$rootScope','$http','dayService', 'commonService','userService',  function($scope,$rootScope,$http,dayService,commonService,userService){
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


	 console.log("1111111 first call of getDaysOfUser");


////////////////////////////////////////////////////////////////
///THIS IS NO LONGER USED except for day creation!!!  
// INTEGRATE commonService lines to showUserProfile
function setDayScope(data) {
	console.log('setDayScope indayController on callback');
	console.log('setDayScope in dayController data is', data);
 	console.log('setDayScope  data.days',  data.days);
	console.log('setDayScope data.user:',  data.user);
	console.log('setDayScope ::::end data');

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



//TODO: DELETE THIS IS NEVER USED//////////////////////////////////////
// function viewUserDays(username){
// 	console.log ('entering viewUserDays');
// 	console.log('username in Day.viewUserdays is ', username);
	
// 	if(username !== null) // selected username
// 		{
// 		console.log('AAAAA username at viewUserDays is ',username);
// 		// $scope.Day.searchResultsMessage='Now Showing Days for '+ username+' Only'; 
// 		dayService.getDaysOfUser(username, setDayScope);  //when user selected
		
// 		}
// 	else if (username === null)  // no username selected
// 		{
// 		console.log('username is null at viewUserDays ***********');
// 		dayService.getDaysOfUser(username, setDayScope);  //when user selected

// 		//dayService.populateDayGrid(setDayScope);  //when no user selected		
// 		} 
// }



////////////////////////////////////////////////////////////////////////
/// CALLBACK switch between two views (templates, public/private) AND set user profile data
function showUserProfile(response) {
	//brought in from setDayScope because this is new unified callback	
		// console.log ("EEEEE in showUserProfile", response);
	console.log ("FFFFFF in showUserProfile response.days", response.days);
	 
  	commonService.formatDates(response.days);  //TODO - NOT YET WORKING
	commonService.tagArrayToString(response.days);


 	//CASE: USER REQUESTS OWN ACCOUNT PROFILE
 	if ($scope.User.username === response.user.userName){

	// console.log ("EEEEEE in showUserProfile response.user", response.user);
	// console.log ("EEEEEE in showUserProfile response.user.created", response.user.created);
	// console.log ("EEEEEE in showUserProfile response.user.userName", response.user.userName);
  	 	$scope.User.profileMode='myAccount';  //sets view template
		$scope.Day.days = response.days; //set incoming day array to scope Days 
 
  	//CASE: USER REQUESTS OTHER ACCOUNT PROFILE
	 } else if ($scope.User.username !== response.user.userName && response.user.userName !== null) 
	 	{
 	 	$scope.User.profileMode='otherprofile';  //sets view template
	 	$scope.Day.days = response.days;    //set incoming day array to scope Days 

	 	//set otherprofile info
	 	$scope.Day.otherusername = response.user.userName;
	 	$scope.Day.othercreated = response.user.created;
	 	$scope.Day.otheruserabout = response.user.userAbout;
	  	}  	


	  //CASE: NO USERNAME REQUESTED SHOW ALL
	  else if (response.user.userName !== null ){

	  	$scope.userViewSwitch = 'grid';
	  	$scope.Day.days = response.days; 

	  }
	

}	
 


//get a selected user profile
 
this.addNewDay = function() {
	//initializes add day form
	$scope.User.userViewSwitch = 'single';
	$scope.User.userAddDay = true;
	$scope.Day.dayWelcomeMsg = 'Tell us about your day!';
};


this.getUserProfile = function(username){
	console.log("currrent user name ******", username);
	$scope.User.userViewSwitch = 'profile';
 	dayService.userProfile(username, showUserProfile );

	//  setDayScope
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



	///TODO: REPLACE WITH getDaysOfUser !!! ////////////////////
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