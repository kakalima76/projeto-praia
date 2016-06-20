angular.module('app')
.service('ordemService', ['$http', function($http){
	var get = function(){
		return $http.get('http://ccuanexos.herokuapp.com/ordem');
	}

	return {
		get: get
	}
}])