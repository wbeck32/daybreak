angular.module('dayBreak').controller('tagController', ['$scope', '$http','dayService', function($scope, $http,dayService){



this.countTag = function() {
	var dayTags = this.dayTags;
	window.localStorage.setItem('dayTags',dayTags);
}

}]);