'use strict';

module.exports = class BaseLog {
  
    constructor() {
        this.existenciaLinhaColunaCabecalho = 'Linha 1 deve possuir os cabeçalhos de dados. A importação não foi realizada.';
        this.existenciaRegistros = 'O arquivo não possui registros a ser importado. Nenhuma ação foi realizada.';
    }
}