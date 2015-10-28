// angular.module('dayBreak').factory('locationFactory', ['$http', function($http) {
// 	var locObject = {};

// 	locObject.buildObject = function(locations) { console.log('factory: ',locations);
// 		locObject = locations;
// 		//return locObject;
// 	}
// 		return locObject;


// }]);


// (function(){
// 'use strict';

// angular
// 	.module('dayBreak')
// 	.factory('locationFactory', locationFactory);

// 	locationFactory.$inject = ['$http'];

// 	function locationFactory($http) { //JAvascrip Hoisting
		
// 		var service = {
// 			this.buildObject: function() {
// 				return "Hello Cesar";
// 				// console.log('factory: ' + locations);
// 			}
// 		}

// 		return service;
// 	}

// })();

// (function(){
// 'use strict';

// angular
// 	.module('dayBreak')
// 	.controller('locationController', locationController);

// 	locationController.$inject = ['$scope, locationFactory'];

// 	function locationFactory($scope, locationFactory) { //JAvascrip Hoisting
		
// 		var vm = this;

// 		vm.cesar = locationFactory.buildObject(); // "Hello Cesar";


// 		vm.amazing = function() {
// 			this.cesar = test;
// 		}
// 	}

// })();


// Template
// <div ng-controller="locationController as location">
// 	<div>{{ location.cesar }}</div> // Hello Cesar
// </div>



