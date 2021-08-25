const DateUtils = require("../../../domain/utils/dateUtils");
const MaskUtils = require("../../../domain/utils/maskUtils");

module.exports = class ExportaAtualizacaoCadastral {

    constructor() {
        this.values = []
        this.columns = []
    }

    /**
     * @description Metodo para EXPORTAR CSV
     * @param {*} item 
     * @returns { valorExportar: array, colunaExportar: array }
     */
    getValorColunaExportarCSV(item) {
        let valorExportar = null
        let colunaExportar = null
    
        if (this.columns.length === 0) {
            this.columns = this.geraColunaExportarTodos();
            valorExportar = this.geraValorColunaExportarTodos(item);
            colunaExportar = this.columns;
        } else {
            valorExportar = this.geraValorColunaExportarTodos(item);
            colunaExportar = null;
        }
        

        return {
            valorExportar,
            colunaExportar
        }
    }

    /**
     * @description Metodo para gerar as colnas do EXPORTAR TODOS CSV
     * @returns 
     */
    geraColunaExportarTodos() {
        const columns = [];
        columns.push('CNPJ_CPF')
        columns.push('Nome Fantasia')
        columns.push('Inscrição Estadual')
        columns.push('Código do Fornecedor')
        columns.push('Código do Banco')
        columns.push('Agência')
        columns.push('Conta')
        columns.push('Tipo Chave Pix')
        columns.push('Valor Chave Pix')
        columns.push('CEP')
        columns.push('Logradouro')
        columns.push('Bairro')
        columns.push('Complemento')
        columns.push('Cidade')
        columns.push('Numero')
        columns.push('UF')
        columns.push('Home Page')        
        columns.push('Email Principal')
        columns.push('Email Operacional')
        columns.push('Email Complementar')
        columns.push('Telefone')

        return columns;
    }

    /**
     * @description Metodo para gerar os valores das colunas do EXPORTAR TODOS
     * @param {*} item 
     * @returns 
     */
    geraValorColunaExportarTodos(item) {
        let values = [];
        values.push(MaskUtils.formatter('00.000.000/0000-00', item.cnpj_cpf)); 
        values.push(item.nomeFantasia)
        values.push(item.inscricaoEstadual)
        values.push(item.codigoFornecedor)
        values.push(item.codigoBanco)     
        values.push(item.agencia)
        values.push(item.conta)                                        
        values.push(item.tipoChavePix)
        values.push(item.valorChavePix)               
        values.push(item.cep)
        values.push(item.logradouro)
        values.push(item.bairro);
        values.push(item.complemento);
        values.push(item.cidade);
        values.push(item.numero);
        values.push(item.uf);
        values.push(item.homePage);
        values.push(item.emailPrincipal);
        values.push(item.emailOperacional);
        values.push(item.emailComplementar);
        values.push(item.telefone);
        return values;
    }

}