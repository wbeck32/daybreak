angular.module('dayBreak').service('dayService',['$http', function($http){

//////  modify to hit getdaysofuser and callback setDayScope
this.userProfile = function(username, showUserProfile) {

	console.log('oooooo requesting username', username);

	$http({
		method: 'POST',
		url: '/api/userprofile',
		data: {username : username},
		headers: {'Content-Type' : 'application/json'}
	})
	.then(function(response){
		console.log('response dayService IIIIIIIII>>>>>>: ', response.data);
		showUserProfile(response.data); //pass entire data object back
	},
	function(data, status, headers, config){

	});
};
 

////////////////////////////////////////////////////////////////////
this.populateDayGrid = function(callback) {
	data = null;  //clear data for use in refresh?
	$http({
		method: 'GET',
		url: '/api/show',
		headers: {'Content-Type' : 'application/json'}
	})
	.then(function(response){
		console.log("WE SHOULD NOT BE USING THIS! success ***: ", response);
		callback(response.data); 
	},
	function(data, status,headers,config){
		console.log("failure ***");
	});
};


this.addDay = function(dayName, userName, userDeactivated, dayDesc, dayLocations, tagArray, dayChild, dayTeen) {
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
						userDeactivated : userDeactivated,
						dayDesc : dayDesc,
						dayTags: uniqueTags,
						dayChild : dayChild,
						dayTeen : dayTeen
			},
			headers: {'Content-Type': 'application/json'}	
			}).then(function(data, status, headers, config){
				console.log('success!');
				window.localStorage.removeItem('dayTags');
			},
			function(data,status,headers,config){
				console.log('failure!');
	 		});
	}
};



this.getDay = function(dayID, chosenDay){
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


this.saveDayChanges = function(Day,User, completeUpdateDay){
	console.log ('saveDayChanges in service: ', Day.locations);
	var tagArray = [];
	var dayDescArray= [];
	var dayNameArray= [];

	if(Day.dayTags) {
 		tagArray = Day.dayTags.split(',');
 	} 
 	if (Day.dayDesc){
		dayDescArray = Day.dayDesc.split(' ');
		Array.prototype.push.apply(tagArray,dayDescArray);
	} 
	if (Day.dayName) {
		dayNameArray = Day.dayName.split(' ');
		Array.prototype.push.apply(tagArray,dayNameArray);
	}
	$http({
			method: 'POST',
			url: 	'/api/savedaychanges',
			data: {	dayID : Day._id,
					dayName : Day.dayName,
					dayDesc : Day.dayDesc,
					dayChild: Day.dayChild,
					dayTeen : Day.dayTeen,
					dayTags : tagArray,
					locations : Day.locations

				},
			headers:{'Content-Type': 'application/json' }	 
		}).then(function(data, status, headers, config) {
			console.log("found the requested day, returning data.dayID", data, " and data.dayName ", data.data[0].dayName);
			window.localStorage.removeItem('dayTags');
			completeUpdateDay(data);
		},
		function(data){
				console.log("DID NOT FIND the requested day");
		});
	};


}]);

