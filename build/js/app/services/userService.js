//user svc

// angular.module('app')
// .service('UserSvc', function($http){
// 	var svc = this;
// 	svc.getUser = function(){
// 		return $http.get('/api/users',{
// 			headers: {'X-Auth': this.token}
// 		})
// 	}
// svc.login = function(username, password){
// 	return $http.post('/api/sessions', {
// 		username: username, password: password
// 	}).then(function(val){
// 		svc.token = val.data
// 		return svc.getUser()
// 		})
// 	}

// })
