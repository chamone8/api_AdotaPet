'use strict';
const BaseLog = require('./baseLog')

module.exports = class RecebimentoLog extends BaseLog {
    
    baseMessageLog(linha) {
        return `Linha ${linha || ''} -`;
    }

    placaExsitenteProcessada(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle} inexistente ou já processada.`;
    }

    placaIdImplantacao(fieldTitle, idImplantacao, baseMessage) {
        return `${baseMessage} ${fieldTitle} não consta na implentação ${idImplantacao}.`;
    }

    itemDuplicado(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle} não pode ser informada por mais de uma vez no mesmo arquivo.`;
    }

    formatoInvalido(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle} Formato do campo é invalido.`;
    }

    campoObrigatorio(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle} não informado.`;
    }

    dateFormat(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle} está em formato inválido para importação. Use o formato [dd/mm/aaaa].`;
    }

    dataRetroativa(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle} inválida. A data informada é inferior a dez dias em relação a data atual.`;
    }

    dataFutura(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle} inválida. A data informada é superior a data atual.`;
    }

}