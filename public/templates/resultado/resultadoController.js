angular.module('app')
.controller('resultadoController', ['$window', 'autorizadoFactory', function($window, autorizadoFactory){
	var vm = this;
	vm.user = $window.localStorage['usuario'];
	vm.ordem = 'ORDEM Nº: ' + $window.localStorage['ordem'].toString();
	vm.vistorias = [];
	vm.sub_resultado = 'templates/sub_templates/sub_resultado.html';
	vm.opcoes = ['todos','conformidade','inconformidade','ausente', 'terceiros','preposto'];

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.buscar = function(date){
		if(!isEmpty(vm.date) && !isEmpty(vm.opcao)){

			var data = date.replace(/(\/)+/g,'');
			var filtro = function(obj){
				if(obj.data === data){
					return true;
				} 
			}

			var filtroOpcao = function(obj){
				if(obj.conformidade === vm.opcao){
					return true;
				}
			}

			function compare(a,b) {
			  	if(a.titular < b.titular){
			  		return -1;
			  	}else if (a.titular > b.titular){
			  		return 1;
			  	}else{
			  		return 0;
			    }	 
			}

			vm.mostrarLoading = true;
			var promise = autorizadoFactory.buscar();
			promise.then(function(dados){
				
				if(vm.opcao === 'todos'){
					vm.vistorias = dados.data.filter(filtro).sort(compare);
				}else{
					vm.vistorias = dados.data.filter(filtro);
					vm.vistorias = vm.vistorias.filter(filtroOpcao).sort(compare);
				}
				
				vm.mostrarLoading = false;
			})

		}else{
			alert('Preencha os campos de pesquisa!!!');
		}

		
	}


}])