angular.module('dayBreak').service('dayService',['$http', function($http){



this.addDay = function(dayName, userName, dayDescArray, dayGroup, dayLocations, tagArray, callback){
	if(dayName){
		$http({
			method: 'POST',
			url: 	'/api/addday',
			data: 	{ 	dayLocations : dayLocations,
						dayName : dayName,
						userName : userName,
						dayDesc : dayDescArray,
						dayGroup: dayGroup,
						dayTags: tagArray
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



this.findTag = function(tag,callback){
	console.log('$$$$$$ tag service ', tag);

//	if(tag){
		$http({
			method: 'POST',
			url:  '/api/taglookup',
			data: {tag: tag},
			headers: {'Content-Type': 'application/json'}	
			})
			.success(function(data){
				console.log('tag success at dayService data is: ', data);
 				callback(data);
			})
			.error(function(data){
				console.log('tag failure');
		});
//	}
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
		.error(function(data){
				console.log("DID NOT FIND the requested day");
		});
	//}
	};

//////////////////////////////////////////////////////////////////////////

this.getDaysOfUser = function(username, callback){

	console.log('^^^^^^^^in dayService incoming user is: ', username);
	//if(dayID){
 		$http({
			method: 'POST',
			url: 	'/api/getdaysofuser',
			data: {	username : username},
			headers:{'Content-Type': 'application/json'}	 
		})
		.success(function(data){
			console.log("found the requested username, returning data.dayID", data, " and data.dayName ", data.dayName);
			callback(data);
		})
		.error(function(data){
				console.log("DID NOT FIND the requested username");
		});
	//}
	};


}]);

