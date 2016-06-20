angular.module('app')
.service('localService', [function(){
	var local = ['PAF01','PAF02','PAF03','PAF04','PAF05','PAF06','PAF07','PAF08','PAF09','PAF10','PAF11'];
	var localAnexo = ['TODOS','PAF01','PAF02','PAF03','PAF04','PAF05','PAF06','PAF07','PAF08','PAF09','PAF10','PAF11'];

	var getLogin = function(){
		return local;
	}

	var get = function(){
		return localAnexo;
	}

	return {
		getLogin: getLogin,
		get: get
	}

}])