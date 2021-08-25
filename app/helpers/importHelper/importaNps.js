const ImportHelperBase = require('./importHelperBase');
const CommonValidacao = require('../../../domain/utils/commonValidacao');
const ChassiValidacao = require('../../../domain/utils/chassiValidacao');
const NpsLog = require('./fileLog/npsLog');
const DateUtils = require('../../../domain/utils/dateUtils');
const IndicadoresRepository = require('../../../domain/repository/indicadoresRepository');
const { FaturamentoArquivoPostResponse, ItemFaturamentoArquivo } = require('../../../domain/dto/faturamentoAqruivoPostDTO');

module.exports = class ImportaNps extends ImportHelperBase {
    /**
     * Creates an instance of ImportaPDI.
     * @param {*} arquivo
     */
    constructor(arquivo, usuarioId, abaIndex) {
        const colunas = [
            {
                nomeObj: 'fornecedor',
                colunaNome: 'Fornecedor (Razão Social)',
                isDate: false
            },
            {
                nomeObj: 'fornecedorID',
                colunaNome: 'Cod. Fornecedor',
                isDate: false
            },
            {
                nomeObj: 'npsValue',
                colunaNome: 'NPS',
                isDate: false
            }
        ];

        super(colunas, abaIndex, arquivo);
        this.usuarioId = usuarioId;
        
        this.tableModelRegistrosValidados = null;

        this.listaNps = [];
        this.log = new NpsLog();
        this.commonValidacao = new CommonValidacao();
        this.chassiValidacao = new ChassiValidacao();
        this.baseLogText = null;
    }

    /**
     * @throws ErrorExecption('Lista de PDI não pode ser vazio.')
     */
    isListaNps() {
        if (this.listaNps.length === 0) {
            throw new ErrorExecption('Lista de PDI não pode ser vazio.');
        }
    }

    /**
     * @returns
     */
    getListaNps() {
        if (this.listaNps.length > 0) {
            return this.listaNps
        } else {
            const data = this.geraObjetoParaImportar();
            const listaNps = [];
            for (let item of data) {
                let obj = this.getObjPorColuna(item);
                obj.linha = item['Linha'];
                listaNps.push(obj);
            }
            this.listaNps = listaNps;
            return this.listaNps;
        }
    }

    async validaDadosNPS() {
        this.isListaNps();
        let indicadoresRepository = new IndicadoresRepository();
        let resultValidacaoDadosExistente = await indicadoresRepository.validaDadosNPS(this.tableModelRegistrosValidados);
        for (let item of resultValidacaoDadosExistente) {
            let linha = item.Linha;
            let fornecedor = item.RazaoSocial;
            let fornecedorID = item.CodigoFornecedor;
            let npsValue = item.QuantidadeAtingida + item.QuantidadeTotal;
            
            let baseMessageLog = this.log.baseMessageLog(linha, fornecedor, fornecedorID, npsValue);

            this.setValidationErrors(this.log.fornecedorNaoEncontrado(baseMessageLog, 'Cod. Fornecedor'));
        }

        this.exceptionHandling();
    }

    /**
     * @throws @throws ErrorExecption('Lista de PDI não pode ser vazio.')
     */
    validaObrigatoriedade() {
        this.isListaNps();
        for (const item of this.listaNps) {
            let linha = item.linha;
            let fornecedor = item.fornecedor || '';
            let fornecedorID = item.fornecedorID || '';
            let npsValue = item.npsValue || 0;
            
            this.baseLogText = this.log.baseMessageLog(linha, fornecedor, fornecedorID, npsValue);

            if (!(fornecedor)) {
                this.setValidationErrors(this.log.campoObrigatorio(this.baseLogText, 'Fornecedor (Razão Social)'));
            }

            if (!(fornecedorID)) {
                this.setValidationErrors(this.log.campoObrigatorio(this.baseLogText, 'Cod. Fornecedor'));
            }

            if (typeof npsValue !== 'number') {
                this.setValidationErrors(this.log.campoObrigatorio(this.baseLogText, 'NPS'));
            }

        }
        this.exceptionHandling();
        this.getTableModel();
    }

    /**
    * Monta o tableModel para as validaçoes
    *
    */
    getTableModel() {
        this.isListaNps();
        this.tableModelRegistrosValidados = this.listaNps.map(value => {
            const obj = {
                linha: value.linha,
                fornecedor: value.fornecedor,
                fornecedorID: value.fornecedorID,
                quantidadeTotal: null,
                quantidadeAtingida: null
            }
            if (value.npsValue > 0) {
                obj.quantidadeTotal = value.npsValue;
                obj.quantidadeAtingida = 0;
            } else {
                obj.quantidadeTotal = 0;
                obj.quantidadeAtingida = value.npsValue ;
            }
            return obj;
        });
    }

    /**
     * @description Monta o objeto a ser inserido
     *
     * @returns array
     */
    getPayloadToSave() {
        this.isListaNps();
        this.getTableModel();
        return this.tableModelRegistrosValidados;
    }

}