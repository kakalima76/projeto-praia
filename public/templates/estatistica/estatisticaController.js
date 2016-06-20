angular.module('app')
.controller('estatisticaController', ['$window', 'autorizadoFactory', 'localService', function($window, autorizadoFactory, localService){
	var vm = this;
	vm.user = $window.localStorage['usuario'];
	vm.local = $window.localStorage['local'];
	vm.ordem = 'ORDEM Nº: ' + $window.localStorage['ordem'].toString();
	vm.estatisticas = [];
	vm.sub_estatisticas = 'templates/sub_templates/sub_estatistica.html'
	vm.opcoes = localService.get();

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
	}

	vm.buscar = function(date){
		vm.estatisticas = [];
		if(!isEmpty(vm.date) && !isEmpty(vm.opcao)){

			var data = date.replace(/(\/)+/g,'');
			var filtro = function(obj){
				if(obj.data === data){
					return true;
				} 
			}

			var filtrolocal = function(obj){
				if(obj.local === vm.opcao){
					return true;
				}
			}


			function compare(a,b) {
			  	if(a.tipo < b.tipo){
			  		return -1;
			  	}else if (a.tipo > b.tipo){
			  		return 1;
			  	}else{
			  		return 0;
			    }	 
			}

			vm.mostrarLoading = true;
			var promise = autorizadoFactory.buscar();
			promise.then(function(dados){
				

				if(vm.opcao === 'TODOS'){
					var array = dados.data.filter(filtro);
				}else{
					var array = dados.data.filter(filtro);
					var array = array.filter(filtrolocal);
				}

				var resultados = array.map(function(obj){
					return {tipo: obj.conformidade, total: 1}
				})


				resultados.forEach(function(value){
					var count = 0;
					resultados.forEach(function(obj){
						if(value.tipo === obj.tipo){
							count = count + 1;
							value.total = count;
						}
					})
				})

				
					var distinctLacre = []
					resultados.forEach(function(value){
						if(distinctLacre.indexOf(value.tipo) === -1){
							distinctLacre.push(value.tipo);
							vm.estatisticas.push({tipo: value.tipo, total: value.total});
						}
					});

				var count = 0;	

				vm.estatisticas.forEach(function(obj){
					count += obj.total;
				})

				vm.estatisticas.push({tipo: 'total', total: count});
				vm.estatisticas.sort(compare);		
				vm.mostrarLoading = false;
			})

		}else{
			alert('Preencha os campos de pesquisa!!!');
		}

		
	}


}])