angular.module('dayBreak').service('dayService',['$http', function($http){

this.populateDayGrid = function(callback) {
	data = null;  //clear data for use in refresh?
	$http({
		method: 'GET',
		url: '/api/show',
		headers: {'Content-Type' : 'application/json'}
	})
	.success(function(data,status,headers, config){
		console.log("success ***: ", data);
		callback(data); 
	})
	.error(function(data, status,headers,config){
		console.log("failure ***");
	});
};


this.addDay = function(dayName, userName, dayDesc, dayGroup, dayLocations, tagArray, callback) {
	if(dayName){
		var lowerTagArray = [];
		tagArray.forEach(function(elem, index, array){
			elem = elem.toLowerCase();
			lowerTagArray.push(elem);
		});
		tagArray = lowerTagArray;
		var uniqueTags = [];
		for (i=0;i<=tagArray.length;i++) {
			if (uniqueTags.indexOf(tagArray[i]) == -1 && tagArray[i] !== '' && tagArray[i]) {
				uniqueTags.push(tagArray[i]);
			}
		}
		$http({
			method: 'POST',
			url: 	'/api/addday',
			data: 	{ 	dayLocations : dayLocations,
						dayName : dayName,
						userName : userName,
						dayDesc : dayDesc,
						dayGroup: dayGroup,
						dayTags: uniqueTags
			},
			headers: {'Content-Type': 'application/json'}	
			}).success(function(data, status, headers, config){
				console.log('success!');
				callback(data);
				window.localStorage.removeItem('dayTags');
			}).error(function(data,status,headers,config){
				console.log('failure!');
	 		});
	}
};

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
			//console.log("found the requested day, returning data.dayID", data, " and data.dayName ", data.dayName);
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
			console.log("found the requested username, returning data.dayID", data, " and data.dayName ", data[0].dayName);
			callback(data);
		})
		.error(function(data){
				console.log("DID NOT FIND the requested username");
		});
	//}
	};


}]);

