angular.module('app', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', '$locationProvider', '$httpProvider', '$sceProvider', function($routeProvider, $locationProvider, $httpProvider, $sceProvider) {
	$sceProvider.enabled(false);

	$routeProvider
	.when('/', {
		templateUrl: 'templates/login/login.html',
		controller: 'loginController',
		controllerAs: 'vm'
	})

	.when('/vistoria', {
		templateUrl: 'templates/vistoria/vistoria.html',
		controller: 'vistoriaController',
		controllerAs: 'vm',
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['usuario']);
				return promise;
			}]
		}
	})

	.when('/resultado', {
		templateUrl: 'templates/resultado/resultados.html',
		controller: 'resultadoController',
		controllerAs: 'vm',
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['usuario']);
				return promise;
			}]
		}
	})

	.when('/estatistica', {
		templateUrl: 'templates/estatistica/estatistica.html',
		controller: 'estatisticaController',
		controllerAs: 'vm',
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['usuario']);
				return promise;
			}]
		}
	})

	.when('/busca', {
		templateUrl: 'templates/busca/busca.html',
		controller: 'buscaController',
		controllerAs: 'vm',
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['usuario']);
				return promise;
			}]
		}
	})

	.when('/ordem', {
		templateUrl: 'templates/ordem/ordem.html',
		controller: 'ordemController',
		controllerAs: 'vm',
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['usuario']);
				return promise;
			}]
		}
	})
	

	.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode({
  		enabled: false,
  		requireBase: false
	});

	$httpProvider.interceptors.push('timestampInterceptor');


}])