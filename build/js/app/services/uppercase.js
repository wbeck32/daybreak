
this.upperCase = function(data) {
  return $http.post('http://test-routes.herokuapp.com/test/uppercase', data);
};