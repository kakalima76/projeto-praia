angular.module('app')
.controller('ordemController', ['$window', 'ordemService', function($window, ordemService){
	var vm = this;
	vm.user = $window.localStorage['usuario'];
	vm.local = $window.localStorage['local'];
	vm.ordem = 'ORDEM Nº: ' + $window.localStorage['ordem'].toString();
	vm.sub_ordem = 'templates/sub_templates/sub_ordem.html';
	
	
	var filtro = function(obj){
		if(obj.numero === parseInt($window.localStorage['ordem'])){
			return true;
		}
	}


	var promise = ordemService.get();
	promise.then(function(dados){
		vm.ordens = dados.data.filter(filtro);
		vm.ordens.forEach(function(dados){
			if(dados['agentes'].substring(0,1) === ','){
				dados['agentes'] = dados['agentes'].substring(1);
			}

			if(dados['chefe'].substring(0,1) === ','){
				dados['chefe'] = dados['chefe'].substring(1);
			}

			if(dados['viatura'].substring(0,1) === ','){
				dados['viatura'] = dados['viatura'].substring(1);
			}

			if(dados['equipe'].substring(0,1) === ','){
				dados['equipe'] = dados['equipe'].substring(1);
			}
		})
	})


}]);