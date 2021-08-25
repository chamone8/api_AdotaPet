'use strict';
const BaseLog = require('./baseLog')

module.exports = class PrevisaoFaturamentoLog extends BaseLog{
    
    baseMessageLog(linha, pedido, codigo, dataPrevisao) {
        return `Linha ${linha || ''} - Pedido ${pedido || ''} - Codigo ${codigo || ''} - Data de Previsão ${dataPrevisao || ''}`;
    }

    dataMaiorDataAtual(baseMessage) {
        return `${baseMessage} Data previsão de faturamento não pode ser inferior a data atual`;
    }

    chaveDuplicada(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle} já relacionado a outro veículo neste arquivo.`;
    }

    campoObrigatorio(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle || ''} não foi informado.`;
    }

    codigoMontadoraMaiorLimit(baseMessage, tamanhoMax) {
        return `${baseMessage} Codigo Montadora é maior que ${tamanhoMax} caracteres.`;
    }

    codigoMontadoraCaracterEspecial(baseMessage) {
        return `${baseMessage} Codigo Montadora não pode ser um caracter especial.`;
    }

    codigoPedidoInvalido(baseMessage) {
        return `${baseMessage} Pedido não está na lista de pendencias de faturamento.`;
    }

    pedidoInxistente(baseMessage) {
        return `${baseMessage} Pedido não não está na lista de pendencias de faturamento.`;
    }

    dateFormat(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle || ''} Use o formato [dd/mm/aaaa].`;
    }

    valueFormat(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle || ''} está em formato inválido para importação.`;
    }
}