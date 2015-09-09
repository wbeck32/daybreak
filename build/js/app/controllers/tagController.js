angular.module('dayBreak').controller('tagController', ['$scope', '$http','dayService', function($scope, $http,dayService){


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



}]);