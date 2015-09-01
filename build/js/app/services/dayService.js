angular.module('dayBreak').service('dayService',['$http', function($http){


this.addDay = function(dayName, userName, dayDesc, dayGroup, dayLocations, dayTags){
	if(dayName){
		$http({
			method: 'POST',
			url: 	'/api/addday',
			data: 	{ 	dayLocations : dayLocations,
						dayName : dayName,
						userName : userName,
						dayDesc : dayDesc,
						dayGroup: dayGroup,
						dayTags: dayTags
			},
			headers: {'Content-Type': 'application/json'}	
			}).success(function(data, status, headers, config){
				console.log('success!');
				window.localStorage.clear('dayTags');
			}).error(function(data,status,headers,config){
				console.log('failure!');
	 		});
	}
};

//
this.getDay = function(dayID){
	if(dayID){
		$http({
			method: 'GET',
			url: 	'/api/getday',
			headers:{'Content-Type': 'application/json'}	 
		})
		.success(function(data,status,headers,config){
			console.log("found the requested day", data._id);
		})
		.error(function(data,status,headers,config){
				console.log("DID NOT FIND the requested day");
		});
	}
};



}]);