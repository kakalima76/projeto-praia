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

	

	.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode({
  		enabled: false,
  		requireBase: false
	});

	$httpProvider.interceptors.push('timestampInterceptor');


}])