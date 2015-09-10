angular.module('dayBreak').controller('dayController', ['$scope', '$rootScope','$http','dayService',  function($scope,$rootScope,$http,dayService){
	
populateDayGrid();

$scope.Day.searchResultLength = 0;

$scope.Day.searchResultsMessage = null;





function completeViewEditUserDays(data){
	console.log('callback setting found days for user', data);
	$scope.days = data;  //updates grid with results
  	$scope.Day.searchResultLength = data.length;

}


this.viewEditUserDays = function(username, callback){

	console.log ('entering viewEditUserDays');
	console.log('username in daycontroller is ', username);

	$scope.Day.searchResultsMessage='Now Showing My Days Only'; 

	dayService.getDaysOfUser(username, completeViewEditUserDays);

};


 
function foundTag(data){
	console.log('doing foundTag', data );
	$scope.days = data;  //updates grid with results?
  	$scope.Day.searchResultLength = data.length;
}

this.findTag = function(tag, foundtag){

	$scope.User.userDayView	= 'grid';   //on search always switch to grid view

	console.log('^^^^^tag is ', tag);
		//strip leading trailing space and to lowercase
		//tag=tag.trim().toLowerCase().replace(/\W+/g, " ");	
	 console.log("incoming for finding start|"+tag+"|end" );	
 
 	if( tag!==undefined){

 	//change to standard lowercase alphanumeric only tag format
 	//and insert a comma between each space delimited search term
	tag=tag.trim().toLowerCase().replace(/\W+/g, ",");
	//every white space string becomes a comma below
	//tag = tag.replace(/\s+/g, ',');

	console.log("REDUCED for finding start|"+tag+"|end" );	

    }

	    if (tag===undefined){
	    	console.log("tag is undefined");

 			$scope.Day.searchResultsMessage='Now Showing All Days'; 

	    	updateDayGrid();

	    	}  //refresh default grid

	    else {
		//call dayService
		$scope.Day.searchResultsMessage='Now Showing Tag Search Results'; 
		console.log(tag, " is tag at dayService");

		dayService.findTag(tag, foundTag);
		}


};



function populateDayGrid() {

	data = null;  //clear data for use in refresh?

	$http({
		method: 'GET',
		url: '/api/show',
		headers: {'Content-Type' : 'application/json'}
	})
	.success(function(data,status,headers, config){
		console.log("success ***");
		$scope.days = data;
	})
	.error(function(data, status,headers,config){
		console.log("failure ***");
	});
}

function updateDayGrid() {

	console.log ("update day grid");
	$scope.User.userFormView = 'hide';
	$scope.User.userDayView = 'grid';
	$scope.Day.dayName='';
	$scope.Day.dayDesc='';
	$scope.Day.dayGroup='';

 

	populateDayGrid();
	
	$scope.Day.searchResultLength = 0;  //reset to 0 so result count does not display



}


this.addDay = function(Day, User) {
	var dayName=Day.dayName;
	var userName=User.username;
	var dayDesc = Day.dayDesc;
	var dayGroup = Day.dayGroup;
	var dayTags = window.localStorage.getItem('dayTags');

	console.log(dayTags," is dayTags at dayController addDay() ");

	var tagArray = [];
	var dayDescArray= [];

	if (dayDesc)
		{dayDescArray = dayDesc.split(' ');}
	else
		{console.log('some kind of problem dayDescArray');}


	if(dayTags) {
 		tagArray = dayTags.split(',');
	}
 	else {console.log('error'); 
 		    }


	dayService.addDay(dayName, userName, dayDescArray, dayGroup, $rootScope.dayLocations, tagArray, updateDayGrid);

};

function chosenDay(data) {
		console.log("data.dayTag", data[0].dayTag);
 		$scope.Day.chosenDay = data[0];
// 		console.log ('&&&&&&running callback chosenDay(data) after finding', data);
		$scope.User.userDayView = 'single';  
//		on successful find change from grid to single
}


this.showOneDay = function(dayID){
	//console.log("showOneDay function in controller", dayID);
	dayService.getDay(dayID, chosenDay);
};

}]);