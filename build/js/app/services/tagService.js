dayBreak.service('tagService', ['$http', function($http){


this.findTag = function(tag, callback){
		$http({
			method: 'POST',
			url:  '/api/taglookup',
			data: {tag: tag},
			headers: {'Content-Type': 'application/json'}
			})
			.success(function(data){
				if(data.length > 0) {
	 					callback(data);
				} else{
					callback(null);
				}
			})
			.error(function(data){
				console.log('tag failure');
		});
};

this.tagList = function(array, callback) {
};

}]);
