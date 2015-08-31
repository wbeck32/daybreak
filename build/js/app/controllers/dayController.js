angular.module('dayBreak').controller('dayController', ['$scope', '$rootScope','$http','dayService', function($scope, $rootScope,$http,dayService){
	
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
	dayService.addDay(dayName, userName, dayDesc, dayGroup,$rootScope.dayLocations);
};



this.showOneDay = function(dayID){

	console.log("showOneDay function in controller", dayID);
	//dayService.getDay(dayID);

	};

}]);