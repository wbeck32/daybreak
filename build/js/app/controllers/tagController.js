angular.module('dayBreak').controller('tagController', ['$scope', '$http','tagService', 'dayService',function($scope, $http, tagService, dayService){

this.enterTag = function() {
	var dayTags = this.dayTags;
	dayTags = dayTags.trim().toLowerCase().replace(/\W+/g, " ");
	dayTags = dayTags.replace(/\s+/g, ',');
	window.localStorage.setItem('dayTags',dayTags);
};

//TODO: this is duplicated in the dayController - find a better place for it
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


function foundTag(data){
	tagArrayToString(data);
	$scope.Day.days = data;  //updates grid with results?
  	$scope.Day.searchResultLength = data.length;
	$scope.User.userFormView = 'hide';
  	$scope.User.userDayView = 'grid';
}

//TODO: duplicated in day controller - need to find a common place to store frequently-used functions
function setDayScope(data) {
	tagArrayToString(data);
	$scope.Day.days = data;
}

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
		console.log("tag is undefined - need to clear search field");
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