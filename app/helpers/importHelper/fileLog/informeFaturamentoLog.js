'use strict';
const BaseLog = require('./baseLog')

module.exports = class InformeFaturamentoLog extends BaseLog {
    
    baseMessageLog(linha, pedido, codigo, codigoMontadora, numeroNf, chassi) {
        return `Linha ${linha || ''} - Pedido ${pedido || ''} - Codigo ${codigo || ''} - Codigo Montadora ${codigoMontadora || ''} - Númermo Nota Fiscal ${numeroNf || ''} - Chassi ${chassi || ''} -`;
    }

    chaveDuplicada(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle} já citado anteriormente neste arquivo.`;
    }

    campoObrigatorio(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle} não informado.`;
    }

    codigoMontadoraMaiorLimit(baseMessage, tamanhoMax) {
        return `${baseMessage} Codigo Montadora é maior que ${tamanhoMax} caracteres.`;
    }

    chassiExistente(baseMessage) {
        return `${baseMessage} Chassi existente no locavia.`;
    }

    cnpjNaoLocalizado(baseMessage) {
        return `${baseMessage} CNPJ não localizado no cadastro de montadoras`;
    }

    cnpjDiferente(baseMessage) {
        return `${baseMessage} CNPJ Faturamento não confere com o CNPJ Empresa Faturamento`;
    }

    pedidoFornecedor(baseMessage) {
        return `${baseMessage} O pedido não pertence ao fornecedor.`;
    }

    numeroCaracteresChaveAcesso(baseMessage) {
        return `${baseMessage} Chave de Acesso inválida, Deve possuir 44 caracteres.`;
    }

    currencyFormat(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle} está em formato inválido para importação. Use o formato [9999999,99].`;
    }

    numericoFormat(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle} está em formato inválido para importação. Use um valor numérico.`;
    }

    dateFormat(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle} está em formato inválido para importação. Use o formato [dd/mm/aaaa].`;
    }

    chassiFormat(baseMessage) {
        return `${baseMessage} Chassi está em formato inválido para importação. Use uma máscara de 17 caracteres, com letras e números.`;
    }

    anoFabricacaoFormat(baseMessage) {
        return `${baseMessage} Ano Fabricação está em formato inválido para importação. Use o formato [AA/AA].`;
    }

    numeroPedidoCaracterEspecial(baseMessage) {
        return `${baseMessage} Número pedido não pode possuir caracter especial.`;
    }

    codigoPedidoInvalido(baseMessage) {
        return `${baseMessage} Pedido não está na lista de pendencias de faturamento.`;
    }
}