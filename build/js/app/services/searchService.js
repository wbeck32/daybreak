dayBreak.service('searchService', ['$http', function($http ){

	this.searchTag = function searchTag(tag,callback){

	    $http({
	    method    : 'POST',
	    url       : '/api/searchTag',
	    data      : {tag       :  tag},
	    headers   : {'Content-Type' : 'application/json'}
	    }).success(function(data,status,headers,config){ 
	      console.log('tag in service is:  ',data);
	      callback(data);
	    }).error(function(data,status, headers, config){
	      console.log("tag in searchService is: " + data);
	      console.log("requested tag not found");
	    }); 

	};



}]);
