angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

//Used to differentiate beetween user's type(teacher or student) who is going to sign up.
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