const DateUtils = require("../../../domain/utils/dateUtils");
const MaskUtils = require("../../../domain/utils/maskUtils");

module.exports = class ExportaContratoAceitoSAP {

    constructor(possuiContrato, isModeloSap) {
        this.data = new Date()
        this.isModeloSap = isModeloSap
        this.values = []
        this.columns = []
        this.possuiContrato = possuiContrato
    }

    /**
     * @description Metodo para EXPORTAR CSV
     * @param {*} item 
     * @returns { valorExportar: array, colunaExportar: array }
     */
    getValorColunaExportarCSV(item) {
        let valorExportar = null
        let colunaExportar = null

        if (this.isModeloSap) {
            if (this.possuiContrato) {
                valorExportar = this.setExportarSapValorComContratoCSV(item);
                colunaExportar = null;
            } else {
                if (this.columns.length === 0) {
                    this.columns = this.setExportarSapColunaSemContratoCSV(item.codigoFornecedorSAP);
                    valorExportar = this.setExportarSapValorSemContratoCSV(item);
                    colunaExportar = this.columns;
                } else {
                    valorExportar = this.setExportarSapValorSemContratoCSV(item);
                    colunaExportar = null;
                }
            }
        } else {
            if (this.columns.length === 0) {
                this.columns = this.geraColunaExportarTodos();
                valorExportar = this.geraValorColunaExportarTodos(item);
                colunaExportar = this.columns;
            } else {
                valorExportar = this.geraValorColunaExportarTodos(item);
                colunaExportar = null;
            }
        }

        return {
            valorExportar,
            colunaExportar
        }
    }

    /**
     * @description Metodo para gerar os valores do EXPORTAR MODELO SAP CSV COM CONTRATO
     * @param {*} item 
     * @returns 
     */
    setExportarSapValorComContratoCSV(item) {
        let sheetData = [];

        sheetData.push(item.numeroContrato);
        sheetData.push('WK');
        sheetData.push('1020');
        sheetData.push('G28');
        sheetData.push('1000');
        sheetData.push(DateUtils.formatDateDDMMYYY((item.dataInicioVigencia)));
        sheetData.push(DateUtils.formatDateDDMMYYY((item.dataTerminoVigencia)));
        sheetData.push('K035');
        sheetData.push('30000');
        sheetData.push('U');
        sheetData.push(item.codigoFornecedorSAP);
        sheetData.push(item.quantidade);
        sheetData.push(item.valorProposta);
        sheetData.push(' ');
        sheetData.push('30000');
        sheetData.push('U');
        sheetData.push(item.natureza);
        sheetData.push(' ');
        sheetData.push(item.codigoModelo);
        sheetData.push(' ');
        sheetData.push(item.combustivel);
        sheetData.push(item.ano);

        return sheetData
    }

    /**
     * @description Metodo para gerar os valores do EXPORTAR MODELO SAP CSV SEM CONTRATO
     * @param {*} item 
     * @returns 
     */
    setExportarSapValorSemContratoCSV(item) {
        let sheetData = [];

        sheetData.push(item.codigoFornecedorSAP ? item.codigoFornecedorSAP : item.chaveSAP);
        sheetData.push(' ');
        sheetData.push(' ');
        sheetData.push('1');
        sheetData.push(item.valorProposta);
        sheetData.push(' ');
        sheetData.push(item.natureza);
        sheetData.push('U');
        sheetData.push(' ');
        sheetData.push(item.valorProposta);
        sheetData.push(' ');
        sheetData.push('30000');
        sheetData.push('U');
        sheetData.push(item.natureza);
        sheetData.push(' ');
        sheetData.push(item.codigoModelo);
        sheetData.push(' ');
        sheetData.push(' ');
        sheetData.push(' ');

        return sheetData
    }

    /**
     * @description Metodo para gerar as colunas do EXPORTAR MODELO SAP CSV SEM CONTRATO
     * @param {*} chaveSAP 
     * @returns 
     */
    setExportarSapColunaSemContratoCSV(chaveSAP) {
        let columns = [];

        columns.push('IM');
        columns.push('1');
        columns.push('1000');
        columns.push('WK');
        columns.push(DateUtils.formatDateDDMMYYY((this.data)));
        columns.push(chaveSAP);
        columns.push('K035');
        columns.push('1020');
        columns.push('G28');
        columns.push('BRL');
        columns.push('1');
        columns.push(' ');
        columns.push(DateUtils.formatDateDDMMYYY((this.data)));
        columns.push(DateUtils.formatDateDDMMYYY((new Date())));
        columns.push(' ');
        columns.push(' ');
        columns.push('30000');

        return columns;
    }

    /**
     * @description Metodo para gerar as colnas do EXPORTAR TODOS CSV
     * @returns 
     */
    geraColunaExportarTodos() {
        const columns = [];
        columns.push('Código Fornecedor');
        columns.push('CNPJ Unidas');
        columns.push('Nome Fantasia');
        columns.push('Material');
        columns.push('Marca');
        columns.push('Modelo');
        columns.push('Ano');
        columns.push('Grupo');
        columns.push('Valor Orçamento');
        columns.push('Valor Referência');
        columns.push('Inserido Em');
        columns.push('Quantidade');
        columns.push('Valor Proposta');
        columns.push('Número Contrato');
        columns.push('Data Início da Vigência');
        columns.push('Data Término da Vigência');
        columns.push('Natureza');
        return columns;
    }

    /**
     * @description Metodo para gerar os valores das colunas do EXPORTAR TODOS
     * @param {*} item 
     * @returns 
     */
    geraValorColunaExportarTodos(item) {
        let values = [];
        values.push(item.CodigoFornecedor);
        values.push(MaskUtils.formatter('00.000.000/0000-00', item.CNPJ));
        values.push(item.NomeFantasia);
        values.push(item.DescricaoMaterial);
        values.push(item.DescricaoMarca);
        values.push(item.DescricaoModelo);
        values.push(item.Ano);
        values.push(item.DescricaoGrupo);
        values.push(MaskUtils.formatMoney(item.ValorProposta));
        values.push(MaskUtils.formatMoney(item.ValorPreenchido));
        values.push(DateUtils.formatDateToString(item.DataInsercao));
        values.push(item.Quantidade);
        values.push(MaskUtils.formatMoney(item.ValorProposta));
        values.push(item.NumeroContrato);
        values.push(DateUtils.formatDateToString(item.DataInicioVigencia));
        values.push(DateUtils.formatDateToString(item.DataTerminoVigencia));
        values.push(item.Natureza);
        return values;
    }

}