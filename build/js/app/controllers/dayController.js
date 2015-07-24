angular.module('dayBreak').controller('dayController', ['$scope', '$http','dayService', function($scope, $http,dayService){
	

$http({
			method: 'GET',
			url: '/api/show',
			headers: {'Content-Type' : 'application/json'}
		})
		.success(function(data,status,headers, config){
			console.log("success ***");
			$scope.days = data;
			})
		.error(function(data, status,headers,config){
			console.log("failure ***");
			});
 


// 			dayName:       req.body.dayName,
//         userName:       req.body.userName,
//         dayCreateDate: Date.now(),
//         dayUpdateDate: Date.now(),
//         dayDate:       Date.now(),
//         dayDesc:       req.body.dayDesc,
//         dayGroup:      req.body.dayGroup,
//         tags:           req.body.tags,
//         locations:      req.body.locations,
//         images:         req.body.images



	this.addDay = function() {
		var dayName=this.dayName;
		var userName=this.userName;
		var dayDesc = this.dayDesc;
		var dayGroup = this.dayGroup;
		dayService.addDay(dayName, userName, dayDesc, dayGroup);
	};


}]);