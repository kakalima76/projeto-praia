angular.module('app')
.controller('estatisticaController', ['$window', 'autorizadoFactory', function($window, autorizadoFactory){
	var vm = this;
	vm.user = $window.localStorage['usuario'];
	vm.ordem = 'ORDEM Nº: ' + $window.localStorage['ordem'].toString();
	vm.estatisticas = [];
	vm.sub_estatisticas = 'templates/sub_templates/sub_estatistica.html'

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
	}

	vm.buscar = function(date){
		vm.estatisticas = [];
		if(!isEmpty(vm.date)){

			var data = date.replace(/(\/)+/g,'');
			var filtro = function(obj){
				if(obj.data === data){
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
				var array = dados.data.filter(filtro);

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
				vm.mostrarLoading = false;
			})

		}else{
			alert('Preencha a data!!!');
		}

		
	}


}])