angular.module('app')
.controller('resultadoController', ['$window', 'autorizadoFactory', 'localService', function($window, autorizadoFactory, localService){
	var vm = this;
	vm.user = $window.localStorage['usuario'];
	vm.local = $window.localStorage['local'];
	vm.ordem = 'ORDEM Nº: ' + $window.localStorage['ordem'].toString();
	vm.vistorias = [];
	vm.sub_resultado = 'templates/sub_templates/sub_resultado.html';
	vm.tipos = ['todos','conformidade','inconformidade','ausente', 'terceiros','preposto'];
	vm.opcoes = localService.get();

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
	}

	vm.buscar = function(date){
		if(!isEmpty(vm.date) && !isEmpty(vm.tipo) && !isEmpty(vm.opcao)){

			var data = date.replace(/(\/)+/g,'');
			var filtro = function(obj){
				if(obj.data === data){
					return true;
				} 
			}

			var filtroOpcao = function(obj){
				if(obj.conformidade === vm.tipo){
					return true;
				}
			}

			var filtrolocal = function(obj){
				if(obj.local === vm.opcao){
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

				if(vm.tipo !== 'todos' && vm.opcao === 'TODOS'){
					vm.vistorias = dados.data.filter(filtro);
					vm.vistorias = vm.vistorias.filter(filtroOpcao).sort(compare);
				}else if(vm.tipo === 'todos' && vm.opcao !== 'TODOS'){
					vm.vistorias = dados.data.filter(filtro);
					vm.vistorias = vm.vistorias.filter(filtrolocal).sort(compare);
				}else if(vm.tipo !== 'todos' && vm.opcao !== 'TODOS'){
					vm.vistorias = dados.data.filter(filtro);
					vm.vistorias = vm.vistorias.filter(filtrolocal).sort(compare);
					vm.vistorias = vm.vistorias.filter(filtrolocal).sort(compare);
				}else{
					vm.vistorias = dados.data.filter(filtro).sort(compare);
				}


				vm.mostrarLoading = false;
			})

		}else{
			alert('Preencha os campos de pesquisa!!!');
		}

		
	}


}])