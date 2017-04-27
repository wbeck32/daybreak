angular.module('dayBreak').controller('tagController', ['$scope', '$rootScope', '$http', 'tagService', 'dayService', 'commonService', function ($scope, $rootScope, $http, tagService, dayService, commonService) {

	function foundTag(data) {
		if(data !== null) {
			commonService.tagArrayToString(data);
			$scope.Day.days = data;  //updates grid with results?
			$scope.Day.searchResultLength = data.length;
			$scope.User.userDayView = 'grid';
		} else {
			dayService.populateDayGrid(setDayScope);
			$scope.Day.searchResultsMessage = 'Tag not found. Now showing all days';
			$scope.Day.searchResultLength = null;
		}
	}

	function setDayScope(data) {
		commonService.tagArrayToString(data);
		$scope.Day.days = data;
	}

	this.enterTag = function () {
		var dayTags = this.dayTags;
		dayTags = dayTags.trim().toLowerCase().replace(/\W+/g, " ");
		dayTags = dayTags.replace(/\s+/g, ',');
		$rootScope.dayTags = dayTags;
	};

	this.findTag = function (tag) {
		$scope.User.userDayView = 'grid';
		if (tag !== undefined) {
			tag = tag.trim().toLowerCase().replace(/\W+/g, ",");
			tagService.findTag(tag, foundTag);
		}
		if (!tag) {
			dayService.populateDayGrid(setDayScope);
			$scope.Day.searchResultsMessage = '';
			$scope.Day.searchResultLength = null;
		}
		else if (tag === undefined) {
			console.log("tag is undefined");
			///TODO: REPLACE WITH getDaysOfUser !!! ////////////////////
			dayService.populateDayGrid(setDayScope);
			$scope.Day.searchResultsMessage = 'Tag not found. Now showing all days';
			$scope.Day.searchResultLength = null;
		} else {
			$scope.Day.searchResultsMessage = 'Now showing tag search results';
			tagService.findTag(tag, foundTag);
		}
	};
}]);
