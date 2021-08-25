const DateUtils = require("../../../domain/utils/dateUtils");
const MaskUtils = require("../../../domain/utils/maskUtils");

module.exports = class ExportaStatusPagamento {

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
        columns.push('CNPJ')
        columns.push('ORIGEM')
        columns.push('Nota Fiscal')
        columns.push('Pedido')
        columns.push('Data Emissão')
        columns.push('Previsão Pagamento')
        columns.push('Data Pagamento')
        columns.push('Valor Total')
        columns.push('Status')
        columns.push('Data Compensação Sap')
        columns.push('Chave Compensação Sap')
        columns.push('issCompensacaoSAP:')
        columns.push('pisCompensacaoSAP: :')
        columns.push('cofinsCompensacaoSAP')
        columns.push('inssCompensacaoSAP')
        columns.push('irfCompensacaoSAP')
        columns.push('csllCompensacaoSAP')
        return columns;
    }

    /**
     * @description Metodo para gerar os valores das colunas do EXPORTAR TODOS
     * @param {*} item 
     * @returns 
     */
    geraValorColunaExportarTodos(item) {
        let values = [];
        values.push(MaskUtils.formatter('00.000.000/0000-00', item.cnpj)); 
        values.push(item.origem)
        values.push(item.numeroNotaFiscal)
        values.push(item.codigoPedidoSap)
        values.push(DateUtils.formatDateDDMMYYY(item.dataEmissao))     
        values.push(DateUtils.formatDateDDMMYYY(item.dataPrevisaoPagamento))
        values.push(DateUtils.formatDateDDMMYYY(item.dataPagamento))                                        
        values.push(MaskUtils.formatMoney(item.total))
        values.push(item.statusNotaFiscal)               
        values.push(item.dataCompensacaoSap)
        values.push(item.chaveCompensacaoSap)
        values.push(MaskUtils.formatMoney(item.issCompensacaoSAP));
        values.push(MaskUtils.formatMoney(item.pisCompensacaoSAP));
        values.push(MaskUtils.formatMoney(item.cofinsCompensacaoSAP));
        values.push(MaskUtils.formatMoney(item.inssCompensacaoSAP));
        values.push(MaskUtils.formatMoney(item.irfCompensacaoSAP));
        values.push(MaskUtils.formatMoney(item.csllCompensacaoSAP));
        return values;
    }

}