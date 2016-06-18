angular.module('app')
.service('sccaService', ['$q', function($q){
	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}
	
	var get = function(value){
		var deferred = $q.defer();

      	$.ajax(
            {
                    url: 'http://scca.rio.rj.gov.br/index.php/online?im=' + value,
                    type: 'GET',
                    success: function(res)
                      {
                                var headline = $(res.responseText).text();
                                var regexTitular = /Nome(\D)+(\s)+Data/g;
                                var regexCPF = /CPF(\w)+/g;
                                var nome = headline.match(regexTitular);
                                var cpfTitular = headline.match(regexCPF);
                        
                                  	if(!isEmpty(nome)){
										var nome = nome[0].replace('Nome', '').replace('Data', '').trim();
                                      	var cpf = cpfTitular[0].replace('CPF', '').trim();
                                      	var obj = {};
                                		obj['nome'] = nome;
                                		obj['cpf'] = cpf;
                                		deferred.resolve(obj);
                                    }else{
                                    	deferred.reject('Número de inscrição inválido');
                                    }

                    }//fim do callback sucess
           });//fim do método ajax

      	return deferred.promise; 

    }//fim mo método extrair

    return {
    	get: get
    }

}])