angular.module('app')
.factory('autorizadoFactory', ['$http', function($http){
	var autorizado = {};
	var setHeader = function(nome, matricula, ordem, data){
		autorizado.nome = nome;
		autorizado.matricula = matricula;
		autorizado.ordem = ordem;
		autorizado.data = data;
	}

	var setDados = function(im, titular, cpf){
		autorizado.im = im;
		autorizado.titular = titular;
		autorizado.cpf = cpf;
	}

	var setVistoria = function(conformidade, multas, pontos){
		autorizado.conformidade = conformidade;
		autorizado.multas = multas;
		autorizado.pontos = pontos;
	}

	var get = function(){
		return autorizado;
	}

	var salvar = function(obj){
		return $http.post('http://ccuanexos.herokuapp.com/autorizado', obj);
	}

	var buscar = function(){
		return $http.get('http://ccuanexos.herokuapp.com/autorizado');
	}



	return {
		get: get,
		setHeader: setHeader,
		setDados: setDados,
		setVistoria: setVistoria,
		salvar: salvar,
		buscar: buscar
	}
		
}]);



	  /*nome: String, 
      matricula: String, 
      ordem: Number, 
      data: String,
      im: String,
      titular: String,
      cpf: String,
      conformidade: String,
      multas: Array,
      latitude: Number,
      longitude: Number,
      horaAutuacao: String,
      pontos: Number*/