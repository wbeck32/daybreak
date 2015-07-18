angular.module('daybreak')
.config(function($routeProvider){
$routeProvider

.when('/', {controller: 'PostsCtrl', templateUrl: 'posts.html'})

.when('/register', {controller: 'RegisterCtrl', templateURL: 'register.html'})

.when('/login', {controller: 'LoginCtrl', templateUrl: 'login.html'})

})