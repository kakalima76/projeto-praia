angular.module('app')
.controller('vistoriaController',['$window', 'sccaService', 'incisosService', function($window, sccaService, incisosService){
	var vm = this;
	vm.showSCCA = 'Mostrar Ficha';
	vm.showMultas = 'Mostrar Infrações';
	vm.incisos = incisosService.get();
	vm.mostrarIframe = false;
	vm.mostrarLoading = false;
	vm.opcoes = ['conformidade', 'inconformidade', 'ausente', 'terceiros'];
	vm.user = $window.localStorage['usuario'];
	vm.ordem = 'ORDEM Nº: ' + $window.localStorage['ordem'].toString();
	vm.subTemplate = 'templates/sub_templates/sub_vistoria.html';
	vm.showOpcoes = false;

	
	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.showFicha = function(){
		if(vm.showSCCA === 'Mostrar Ficha'){
			vm.showSCCA = 'Esconder Ficha';
		}else{
			vm.showSCCA = 'Mostrar Ficha';
		}
	}

	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
		console.log('teste');
	}

	vm.buscar = function(inscricao){
		vm.showOpcoes = false;
		vm.showSalvarInfracoes = false;
		vm.mostrarSalvar = false;
		vm.opcao = null;

		if(!isEmpty(inscricao)){
			vm.mostrarLoading = true;
			vm.mostrarIframe = false;
			vm.mostraInfracoes = false;
			var promise = sccaService.get(inscricao);
			promise.then(function(ficha){
				vm.mostrarLoading = false;
				vm.mostrarIframe = true;
				vm.buscarInscricao = 'http://scca.rio.rj.gov.br/index.php/online?im=' + inscricao;
				vm.showOpcoes = true;

			});
			promise.catch(function(err){
				alert(err);
				vm.mostrarLoading = false;
			})
		}
	}

	vm.prosseguir = function(escolha){
		vm.mostrarSalvar = false;
		vm.mostraInfracoes = false;
		if(!isEmpty(escolha)){
			if(escolha === 'conformidade' || escolha === 'ausente'){
				vm.mostrarSalvar = true;
			}else{
				vm.mostraInfracoes = true;
			}
		}
	}

	vm.showInfracoes = function(){
		if(vm.showMultas === 'Mostrar Infrações'){
			vm.showMultas = 'Confirmar Infrações';
			vm.showSalvarInfracoes = false;
		}else{
			vm.showMultas = 'Mostrar Infrações';
			vm.showSalvarInfracoes = true;
		}
	}



	function reseta(){
		vm.showOpcoes = false;
		vm.showSalvarInfracoes = false;
		vm.mostrarSalvar = false;
		vm.opcao = null;
		vm.mostrarIframe = false;
		vm.inscricao = null;
	}

	vm.salvarInfracoes = function(){
		function filtro(value){
			if(value.escolhido === true){
				return true;
			}
		}

		var escolhidos = vm.incisos.filter(filtro);

		console.log(escolhidos);
		reseta();

	}

	vm.salvar = function(){
		reseta();
	}



}]);