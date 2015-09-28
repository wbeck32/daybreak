angular.module('dayBreak').controller('tagController', ['$scope', '$http','tagService', 'dayService','commonService',function($scope, $http, tagService, dayService, commonService){

function foundTag(data){
	commonService.tagArrayToString(data);
	$scope.Day.days = data;  //updates grid with results?
  	$scope.Day.searchResultLength = data.length;
	//$scope.User.userFormView = 'hide';
  	$scope.User.userDayView = 'grid';
}

function setDayScope(data) {
 	commonService.tagArrayToString(data);
 	$scope.Day.days = data;
}

this.enterTag = function() {
	var dayTags = this.dayTags;
	dayTags = dayTags.trim().toLowerCase().replace(/\W+/g, " ");
	dayTags = dayTags.replace(/\s+/g, ',');
	window.localStorage.setItem('dayTags',dayTags);
};

this.findTag = function(tag){
	$scope.User.userDayView	= 'grid';
	console.log('^^^^^tag is ', tag);
		//strip leading trailing space and to lowercase
		//tag=tag.trim().toLowerCase().replace(/\W+/g, " ");	
	 //console.log("incoming for finding start|"+tag+"|end" );	
 	if(tag !== undefined){
		tag = tag.trim().toLowerCase().replace(/\W+/g, ",");
		tagService.findTag(tag, foundTag);
		console.log("REDUCED for finding start|"+tag+"|end" );	
    } if(tag === undefined) {
		console.log("tag is undefined");
		dayService.populateDayGrid(setDayScope);
		$scope.Day.searchResultsMessage='Now Showing All Days'; 
		$scope.Day.searchResultLength = null;
	} else { 
		//call dayService
		$scope.Day.searchResultsMessage='Now Showing Tag Search Results'; 
		tagService.findTag(tag, foundTag);
	} 		
};
}]);