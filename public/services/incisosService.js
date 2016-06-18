angular.module('app')
.service('incisosService', [function(){
	var incisos =
  	[

            {artigo: '47', inciso: 'II',  texto: 'Mercadejar em desacordo com os termos de sua autorização.', valor: 'R$ 391,50', pontos: 2},
            {artigo: '47', inciso: 'III',   texto: 'Não se apresentar em rigorosas condições de asseio.', valor: 'R$ 391,50', pontos: 2},
            {artigo: '47', inciso: 'IV',  texto: 'Apresentar-se em veículo ou unidade autorizada em mau estado de conservação ou em condições precárias de higiene.', valor: 'R$ 783,00', pontos: 2},
            {artigo: '47', inciso: 'V',   texto: 'Não manter limpo o local de estacionamento.', valor: 'R$ 783,00', pontos: 2},
            {artigo: '47', inciso: 'VI',  texto: 'Utilizar buzinas, campainhas e outros meios ruidosos de propaganda.', valor: 'R$ 391,50', pontos: 2},
            {artigo: '47', inciso: 'VII',   texto: 'Não apresentar, quando exigidos, quaisquer dos documentos a que se refere o artigo 56 desta Lei.', valor: 'R$ 391,50', pontos: 2},
            {artigo: '47', inciso: 'VIII',  texto: 'Não manter, em local visível, a tabela de preços dos produtos comercializados exigida pelo art. 57 desta Lei.', valor: 'R$ 391,50', pontos: 2},
            {artigo: '47', inciso: 'IX',  texto: 'Comercializar produtos proibidos por esta Lei.', valor: 'R$ ', pontos: 5},
            {artigo: '47', inciso: 'X',   texto: 'Perturbação da ordem pública, falta de urbanidade, incontinência pública.', valor: 'R$ 1566,00', pontos: 5},
            {artigo: '47', inciso: 'XI',  texto: 'Uso de caixotes como assento ou para exposição de mercadoria sobre o passeio.', valor: 'R$ 391,50', pontos: 5},
            {artigo: '47', inciso: 'XII',   texto: 'Prejuízo do fluxo de pedestre na calçada.', valor: 'R$ 783,0', pontos: 5},
            {artigo: '47', inciso: 'XIII',  texto: 'Ocupação não autorizada de área pública por qualquer equipamento fixo ou móvel diferente de tabuleiro, carrocinha e triciclo.', valor: 'R$ 3915,00', pontos: 2},
            {artigo: '54', inciso: 'I',   texto: 'Perturbação da ordem pública, falta de urbanidade, incontinência pública, prática de crime ou contravenção no local do ponto fixo.', valor: 'R$ R$ 391,50', pontos: 5},
            {artigo: '54', inciso: 'II',  texto: 'Permanência em local diferente do autorizado.', valor: 'R$ R$ 391,50', pontos: 5},
            {artigo: '54', inciso: 'III',   texto: 'Mudança do ponto fixo sem prévia autorização.', valor: 'R$ R$ 391,50', pontos: 5},
            {artigo: '54', inciso: 'IV',  texto: 'Inobservância do Regulamento Sanitário.', valor: 'R$ R$ 391,50', pontos: 5},
            {artigo: '54', inciso: 'V',   texto: 'Uso de caixotes como assento ou para exposição de mercadorias sobre o passeio.', valor: 'R$ R$ 391,50', pontos: 5},
            {artigo: '54', inciso: 'VI',  texto: 'Impedimento do livre trânsito nos passeios.', valor: 'R$ R$ 391,50', pontos: 5},
            {artigo: '54', inciso: 'VII',   texto: 'Venda de mercadoria não permitida nesta Lei.', valor: 'R$ R$ 391,50', pontos: 5},
            {artigo: '54', inciso: 'VIII',  texto: 'Venda de mercadoria não autorizada.', valor: 'R$ R$ 391,50', pontos: 5}
    ];	

    var get = function(){
    	return incisos;
    }

    return {
    	get: get
    }

}])