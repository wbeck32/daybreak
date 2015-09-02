angular.module('dayBreak').service('dayService',['$http', function($http){


this.addDay = function(dayName, userName, dayDesc, dayGroup, dayLocations, dayTags, callback){
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
				callback();
				window.localStorage.removeItem('dayTags');
			}).error(function(data,status,headers,config){
				console.log('failure!');
	 		});
	}
};

//
this.getDay = function(dayID, callback){
	console.log('********in dayService incoming dayID is: ', dayID);
	//if(dayID){
 		$http({
			method: 'POST',
			url: 	'/api/getday',
			data: {	dayID : dayID},
			headers:{'Content-Type': 'application/json'}	 
		})
		.success(function(data){
			console.log("found the requested day, returning data.dayID", data, " and data.dayName ", data.dayName);
			callback(data);
		})
		.error(function(data,status,headers,config){
				console.log("DID NOT FIND the requested day");
		});
	//}
};


}]);