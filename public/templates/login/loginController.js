angular.module('app')
.controller('loginController', ['$window', 'agentesService', '$location', function($window, agentesService, $location){
	var vm = this;
	vm.showError = false;
	vm.user = null;
	vm.pass = null;

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.logoff = function(){
		$window.localStorage.removeItem('usuario');
		console.log('teste');
	}

	vm.logar = function(){

			function zeros(num){
			return (num < 10) ? '0' + num : num;
			}

			function montaData(){
				var data = new Date();
				var dia = data.getDate().toString();
				var mes = (data.getMonth() + 1).toString();
				var ano = data.getFullYear().toString();
				return zeros(dia) + zeros(mes) + ano;
			}

			vm.showErrorLocal = false;
			vm.showError = false; 
			vm.mostrarLoading = true;
			 var promise = agentesService.getAuth(vm.user);
			 promise.then(function(usuario){
			 if(!isEmpty(usuario.data)){

			 	if(usuario.data[montaData()]){
			 		if(usuario.data[montaData()].ordem > 0){
				 		if(usuario.data.senha === vm.pass){
					 		var date = new Date();
					 		$window.localStorage['usuario'] = usuario.data.nome;
					 		$window.localStorage['ordem'] = usuario.data[montaData()].ordem;
					 		$window.localStorage['chefe'] = usuario.data.chefe;
					 		montaData();
					 		$location.path('vistoria');
					 	}else{
					 		vm.showError = true;
					 	}

			 		}else{
			 			vm.showError = true;
			 		}
			 	}else{
			 		vm.showError = true;
			 	}

			 }else{
			 	vm.showError = true;
			 }
			 	vm.mostrarLoading = false;
			 });

			 promise.catch(function(){
			 	vm.mostrarLoading = false;
			 });
	}
	
}])