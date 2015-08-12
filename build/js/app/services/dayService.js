angular.module('dayBreak').service('dayService',['$http', function($http){


this.addDay = function(dayName, userName, dayDesc, dayGroup, dayLocations){
	var dayTags = window.localStorage.getItem('dayTags');
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