dayBreak.service('tagService', ['$http', function($http){


this.findTag = function(tag, callback){ console.log('findTag: ',tag);
		$http({
			method: 'POST',
			url:  '/api/taglookup',
			data: {tag: tag},
			headers: {'Content-Type': 'application/json'}	
			})
			.success(function(data){
				console.log('tag success at tagService data is: ', data);
 				callback(data);
			})
			.error(function(data){
				console.log('tag failure');
		});
};

this.tagList = function(array, callback) {

};

}]);