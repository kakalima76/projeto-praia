angular.module('app')
.controller('vistoriaController',['$window', 'sccaService', 'incisosService', 'autorizadoFactory', function($window, sccaService, incisosService, autorizadoFactory){
	var vm = this;
	vm.showSCCA = 'Mostrar Ficha';
	vm.showMultas = 'Mostrar Infrações';
	vm.incisos = incisosService.get();
	vm.mostrarIframe = false;
	vm.mostrarLoading = false;
	vm.opcoes = ['conformidade', 'inconformidade', 'ausente', 'terceiros','preposto'];
	vm.user = $window.localStorage['usuario'];
	vm.local = $window.localStorage['local'];
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
				var nome = $window.localStorage['usuario'];
				var matricula = $window.localStorage['matricula'];
				var ordem = parseInt($window.localStorage['ordem']);
				var data = $window.localStorage['data'];
				var local = $window.localStorage['local'];
				autorizadoFactory.setHeader(nome, matricula, ordem, data, local);
				autorizadoFactory.setDados(vm.inscricao, ficha.nome, ficha.cpf);

				console.log(autorizadoFactory.get());
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
			if(escolha === 'conformidade' || escolha === 'ausente' || escolha === 'preposto'){
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
		vm.incisos.forEach(function(valor){
			if(valor.escolhido){
				valor.escolhido = false;
			}
		})
		vm.salvarLoading = false;
	}

	vm.salvarInfracoes = function(){
		vm.salvarLoading = true;
		function filtro(value){
			if(value.escolhido === true){
				return true;
			}
		}

		var escolhidos = vm.incisos.filter(filtro);
		var pontos = 0;
		escolhidos.forEach(function(obj){
			pontos += obj.pontos;
		})

		autorizadoFactory.setVistoria(vm.opcao, escolhidos, pontos);
		var promise = autorizadoFactory.salvar(autorizadoFactory.get());
		promise.then(function(){
			reseta();
		}).catch(function(){
			alert('problemas no autorizadoFactory.salvar()');
		})	

	}

	vm.salvar = function(){
		vm.salvarLoading = true;
		var multas = [];
		var pontos = 0;
		autorizadoFactory.setVistoria(vm.opcao, multas, pontos)
		var promise = autorizadoFactory.salvar(autorizadoFactory.get());
		promise.then(function(){
			reseta();
		}).catch(function(){
			alert('problemas no autorizadoFactory.salvar()');
		})
	}



}]);