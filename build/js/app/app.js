var dayBreak = angular.module('dayBreak',['ngRoute']);

dayBreak.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/addLocation', {
        templateUrl: 'addLoc.html',
        controller: 'locationController'
      }).otherwise({
        redirectTo: '/'
      });
  }]);
