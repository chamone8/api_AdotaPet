'use strict';
const BaseLog = require('./baseLog')

module.exports = class SocioAmbientalLog extends BaseLog {

    baseMessageLog(linha) {
        return `Linha ${linha} -`
    }


    campoObrigatorio(baseMessage, fieldTitle) {
        return `${baseMessage} ${fieldTitle || ''} não informado.`;
    }

    fornecedorNaoEncontrado(baseMessage, fieldTitle) {
        return `${baseMessage} ${fieldTitle || ''} Fornecedor não encontrado.`;
    }
}