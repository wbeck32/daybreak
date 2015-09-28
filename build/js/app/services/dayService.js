angular.module('dayBreak').service('dayService',['$http', function($http){


this.userProfile = function(username,callback) {
	$http({
		method: 'POST',
		url: '/api/userprofile',
		data: {username : username},
		headers: {'Content-Type' : 'application/json'}
	})
	.then(function(response){
		console.log('response: ', response);
		callback(response);
	},
	function(data, status, headers, config){

	});
};

this.populateDayGrid = function(callback) {
	data = null;  //clear data for use in refresh?
	$http({
		method: 'GET',
		url: '/api/show',
		headers: {'Content-Type' : 'application/json'}
	})
	.then(function(response){
		console.log("success ***: ", response);
		callback(response.data); 
	},
	function(data, status,headers,config){
		console.log("failure ***");
	});
};


this.addDay = function(dayName, userName, dayDesc, dayLocations, tagArray, dayChild, dayTeen, daycallback) {
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
						dayTags: uniqueTags,
						dayChild : dayChild,
						dayTeen : dayTeen
			},
			headers: {'Content-Type': 'application/json'}	
			}).then(function(data, status, headers, config){
				console.log('success!');console.log('skfjdlksjfalkdjs: ',data.dayChild);
				daycallback(data); 
				window.localStorage.removeItem('dayTags');
			},
			function(data,status,headers,config){
				console.log('failure!');
	 		});
	}
};



this.getDay = function(dayID, callback){
	console.log('********in dayService incoming dayID is: ', dayID);

	if(dayID){
 		$http({
			method: 'POST',
			url: 	'/api/getday',
			data:   {dayID : dayID	 },
			headers:{'Content-Type': 'application/json'}	 
		})
		.then(
		function(data){
			console.log("found the requested day, returning data", data);
			chosenDay(data);
		},
		function(data){
				console.log("DID NOT FIND the requested day");
		});
	}
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
		.then(
		function(data){
			console.log("found the requested username, returning data", 
				data, " and data.data ", data.data);
			callback(data.data);
		},
		function(data){
				console.log("DID NOT FIND the requested username");
		});
	//}
	};



this.saveDayChanges = function(Day,User, completeSaveDayChanges){
	console.log ('saveDayChanges in service');

	$http({
			method: 'POST',
			url: 	'/api/savedaychanges',
			data: {	dayID : dayID },
			headers:{'Content-Type': 'application/json'}	 
		})
		.then(
		function(data){
			//console.log("found the requested day, returning data.dayID", data, " and data.dayName ", data.dayName);
			callback(data);
		},
		function(data){
				console.log("DID NOT FIND the requested day");
		});
	};


}]);

