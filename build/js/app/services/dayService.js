angular.module('dayBreak').service('dayService',['$http', function($http){


this.addDay = function(dayName, userName, dayDesc, dayGroup){
	var dayTags = window.localStorage.getItem('dayTags');
	console.log(dayTags);
	dayLocations = window.localStorage.getItem('dl');
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

}]);