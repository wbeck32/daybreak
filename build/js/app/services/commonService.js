dayBreak.service('commonService', ['$http', function($http){

this.tagArrayToString = function(data){
	Object.keys(data).forEach(function(key){
		if(data[key].dayTags) {
			var tagString = '';
			data[key].dayTags.forEach(function(elem){
				tagString += ', '+elem;
			}); 
			tagString = tagString.substr(2);
			data[key].dayTags = tagString;
		}
	});
	return data;
};

this.formatDates = function(data) {
	for (j=0;j<=data.length;j++) { 
		if(data[j]) {
		 var fDate = new Date(data[j].dayDate).toString();
		 fDate = fDate.substr(4,4)+' '+fDate.substr(8,2)+', '+fDate.substr(11,4);
		 data[j].dayDate = fDate;
		}

	}
return data;
};

}]);