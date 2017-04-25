angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('sharedData', [function(){
	var data = 'null';

	return {
		getData : function() {
			return data;
		},
		setData : function(value) {
			data = value;
		}
	};

}]);