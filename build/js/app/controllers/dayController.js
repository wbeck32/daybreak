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

this.addDay = function(Day, User) {
	var dayName=Day.dayName;
	var userName=User.username;
	var dayDesc = Day.dayDesc;
	var dayGroup = Day.dayGroup;
	var dayTags = window.localStorage.getItem('dayTags');
	var tagArray = dayTags.split(',');
	dayService.addDay(dayName, userName, dayDesc, dayGroup, $rootScope.dayLocations, tagArray);
};

function chosenDay(data) {

		console.log("data.dayName", data[0].dayName);

 		$scope.Day.chosenDay = data[0];
 		console.log ('&&&&&&running callback chosenDay(data) after finding', data);
		}

this.showOneDay = function(dayID){

	console.log("showOneDay function in controller", dayID);
	dayService.getDay(dayID, chosenDay);

	};

}]);