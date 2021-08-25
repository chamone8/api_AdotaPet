'use strict';
const BaseLog = require('./baseLog')

module.exports = class NpsLog extends BaseLog{
    
    baseMessageLog(linha, nomeFornecedor, codFornecedor, nps) {
        return `Linha ${linha} - Fornecedor ${nomeFornecedor} - Cod.Fornecedor ${codFornecedor} - NPS ${nps} `
    }

    campoObrigatorio(baseMessage, fieldTitle) {
        return `${baseMessage} ${fieldTitle || ''} não informado.`;
    }
    
    fornecedorNaoEncontrado(baseMessage, fieldTitle) {
        return `${baseMessage} ${fieldTitle || ''} Fornecedor não encontrado.`;
    }
}