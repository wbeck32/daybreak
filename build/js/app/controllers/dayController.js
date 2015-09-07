angular.module('dayBreak').controller('dayController', ['$scope', '$rootScope','$http','dayService',  function($scope,$rootScope,$http,dayService){
	
populateDayGrid();

$scope.Day.searchResultLength = 0;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//mh MOVED enterTag from tagController to dayContrller and changed index.html
//as required

this.enterTag = function() {
	var dayTags = this.dayTags;
	console.log('incoming at tagController- start|'+dayTags+'|end');

	//change to standard lowercase alphanumeric only tag format
	dayTags=dayTags.trim().toLowerCase().replace(/\W+/g, " ");
	//every white space string becomes a comma below
	dayTags = dayTags.replace(/\s+/g, ',');

	console.log("trimmed and lowered for saving - start|"+tags+"|end" );	

	window.localStorage.setItem('dayTags',dayTags);
};
	

this.retrieveTag = function() {
};

//mh moved above from dayController //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 
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
	    	updateDayGrid();}  //refresh default grid
 
	    else {
		//call dayService
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

	if(dayTags) {
 		tagArray = dayTags.split(',');
	}
 	else {console.log('88888888'); 
 		  this.enterTag(Day.dayTags);  }


	dayService.addDay(dayName, userName, dayDesc, dayGroup, $rootScope.dayLocations, tagArray, updateDayGrid);

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