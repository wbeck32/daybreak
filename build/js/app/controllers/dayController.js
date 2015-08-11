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

this.addDay = function() {
	var dayName=this.dayName;
	var userName=this.userName;
	var dayDesc = this.dayDesc;
	var dayGroup = this.dayGroup;
	dayService.addDay(dayName, userName, dayDesc, dayGroup);
};


}]);