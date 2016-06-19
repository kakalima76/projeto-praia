angular.module('app')
.controller('buscaController', ['$window', 'autorizadoFactory', function($window, autorizadoFactory){
	var vm = this;
	vm.user = $window.localStorage['usuario'];
	vm.ordem = 'ORDEM Nº: ' + $window.localStorage['ordem'].toString();
	vm.sub_busca = 'templates/sub_templates/sub_busca.html';
	vm.data = [{mes: 'janeiro', id: '01'},{mes: 'fevereiro', id: '02'},{mes: 'março', id: '03'},{mes: 'abril', id: '04'},{mes: 'maio', id: '05'},{mes: 'junho', id: '06'},{mes: 'julho', id: '07'},{mes: 'agosto', id: '08'},{mes: 'setembro', id: '09'},{mes: 'outubro', id: '10'},{mes: 'novembro', id: '11'},{mes: 'dezembro', id: '12'}];

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.buscar = function(){
		vm.autorizados = [];
		if(!isEmpty(vm.im) && !isEmpty(vm.date)){

			var filtro = function(obj){
				if(obj.im === vm.im && obj.data.substring(2,4) === vm.date.id){
					return true;
				} 
			}


			function compare(a,b){
			  	if(a.data.substring(0,2) < b.data.substring(0,2)){
			  		return -1;
			  	}else if (a.data.substring(0,2) > b.data.substring(0,2)){
			  		return 1;
			  	}else{
			  		return 0;
			    }	 
			}

			vm.mostrarLoading = true;
			var promise = autorizadoFactory.buscar();
			promise.then(function(dados){
				if(dados.data.length > 0){
					var array = dados.data.filter(filtro);
					vm.autorizados = array.sort(compare)
				}else{
					alert('Inscrição municipal inválida!!!');
				}
				
				vm.mostrarLoading = false;
			})

			promise.catch(function(){
				vm.mostrarLoading = false;
			})

		}else{
			alert('Informe matrícula e data!!!');
		}

		
	}


}])