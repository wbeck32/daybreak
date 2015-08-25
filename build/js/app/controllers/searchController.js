dayBreak.controller('searchController',
		['$scope', '$http', 'searchService', function($scope,$http,searchService){ 


		$scope.search.type = null ;  //tag

	// function xxxxxx(data){ 
	// 	    $scope.User.uniqueUserName = data;
	// 	  	}

	this.searchTag = function(username){
		  if(tag.length > 2){
		  searchService.searchTag(tag);
			} else {
			console.log("avoid searching for a tag until user enters a few characters");
			}
		};



}]);