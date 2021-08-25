const ImportHelperBase = require('./importHelperBase');
const DateUtils = require('../../../domain/utils/dateUtils');
const RecebimentoLog = require('./fileLog/recebimentoLog');
const CommonValidacao = require('../../../domain/utils/commonValidacao');
const VeiculoImplantacaoRepository = require('../../../domain/repository/veiculoImplantacaoRepository');

module.exports = class ImportaRecebimento extends ImportHelperBase {

    constructor(arquivo, fornecedorId, usuarioId, abaIndex) {
        const colunas = [
            {
                nomeObj: 'implantacaoId',
                colunaNome: 'Código Implantação',
                isDate: false
            },
            {
                nomeObj: 'placa',
                colunaNome: 'Placa',
                isDate: false
            },
            {
                nomeObj: 'modelo',
                colunaNome: 'Modelo',
                isDate: false
            },
            {
                nomeObj: 'cor',
                colunaNome: 'Cor',
                tipo: 'string',
                required: false
            },
            {
                nomeObj: 'dataExpedicao',
                colunaNome: 'Expedição',
                isDate: true
            },
            {
                nomeObj: 'dataColeta',
                colunaNome: 'Coleta',
                isDate: true
            },
            {
                nomeObj: 'dataEmbarque',
                colunaNome: 'Embarque',
                isDate: true
            },
            {
                nomeObj: 'dataPrevisaoEntrega',
                colunaNome: 'Previsão de entrega',
                isDate: true
            },
            {
                nomeObj: 'dataEntrega',
                colunaNome: 'Data Entrega',
                isDate: true
            }
        ];
        super(colunas, abaIndex, arquivo);
        this.fornecedorId = fornecedorId;
        this.usuarioId = usuarioId;

        this.recebimentos = [];
        this.log = new RecebimentoLog();
        this.commonValidacao = new CommonValidacao();
        this.baseLogText = null;
    }

    /**
     * @description Verifica se o objeto Recebimentos ja foi devidamente gerado
     *
     * @throws ErrorExecption('Recebimentos não pode ser vazio.')
     */
    isRecebimentos() {
        if (this.recebimentos.length === 0) {
            throw new ErrorExecption('Recebimentos não pode ser vazio.');
        }
    }

    /**
     * @description Gera o objeto que pode passar pelas regras da importação
     *
     * @returns Array recebimentos
     */
    getRecebimentos() {
        if (this.recebimentos.length > 0) {
            return this.recebimentos
        } else {
            const data = this.geraObjetoParaImportar();
            const recebimentos = [];
            for (let item of data) {
                let obj = this.getObjPorColuna(item);
                obj.linha = item['Linha'];
                recebimentos.push(obj);
            }
            this.recebimentos = recebimentos;
            return this.recebimentos;
        }
    }

    /**
     * @description Valida a obrigatoriedade dos campos
     * 
     * @throws @throws ErrorExecption('Recebimentos não pode ser vazio.')
     */
    validaObrigatoriedade() {
        this.isRecebimentos();
        for (const item of this.recebimentos) {
            let linha = item.linha;
            let placa = item.placa;
            let implantacaoId = item.implantacaoId;
            let dataEntrega = item.dataEntrega;
            this.baseLogText = this.log.baseMessageLog(linha);

            if (!(implantacaoId)) {
                this.setValidationErrors(this.log.campoObrigatorio('Código Implantação', this.baseLogText));
            }

            if (!(placa)) {
                this.setValidationErrors(this.log.campoObrigatorio('Placa', this.baseLogText));
            }

            if (!(dataEntrega)) {
                this.setValidationErrors(this.log.campoObrigatorio('Data Entrega', this.baseLogText));
            } else {
                if (!(this.commonValidacao.dateFormatDDMMYYY(dataEntrega))) {
                    this.setValidationErrors(this.log.dateFormat('Data Entrega', this.baseLogText));
                } else if (!DateUtils.validaDataRetroativa(dataEntrega, -10)) {
                    this.setValidationErrors(this.log.dataRetroativa('Data Entrega', this.baseLogText));
                } else if (!DateUtils.validaDataFutura(dataEntrega)) {
                    this.setValidationErrors(this.log.dataFutura('Data Entrega', this.baseLogText));
                }
            }

        }
        this.exceptionHandling();
    }

    /**
     * @description Valida se a placa esta vinculada ao fornecedor indicado
     *
     * @throws Placa inexistente ou já processada
     */
    async validaPlacaVinculada() {
        this.isRecebimentos();
        let veiculoImplantacaoRepository = new VeiculoImplantacaoRepository();
        let result = await veiculoImplantacaoRepository.validaPlacaVinculadaForn('vinculada', this.recebimentos, this.fornecedorId);
        for (let item of result) {
            let linha = item.Linha;
            let baseLogText = this.log.baseMessageLog(linha);
            this.setValidationErrors(this.log.placaExsitenteProcessada('Placa', baseLogText));
        }
        this.exceptionHandling();
    }

    /**
     * @description Valida se as placas ja foram enviadas
     * 
     * @throws Placa inexistente ou já processada
     */
    async validaPlacaEnviada() {
        this.isRecebimentos();
        let veiculoImplantacaoRepository = new VeiculoImplantacaoRepository();
        let result = await veiculoImplantacaoRepository.validaPlacaVinculadaForn('enviados', this.recebimentos, this.fornecedorId);
        for (let item of result) {
            let linha = item.Linha;
            let baseLogText = this.log.baseMessageLog(linha);
            this.setValidationErrors(this.log.placaExsitenteProcessada('Placa', baseLogText));
        }
        this.exceptionHandling();
    }

    /**
     * @description Valida se as placas estão duplicadas
     *
     * @throws Placa não pode ser informada por mais de uma vez no mesmo arquivo.
     */
    async validaPlacaDuplicadas() {
        this.isRecebimentos();
        let veiculoImplantacaoRepository = new VeiculoImplantacaoRepository();
        let result = await veiculoImplantacaoRepository.validaPlacaVinculadaForn('duplicado', this.recebimentos, this.fornecedorId);
        for (let item of result) {
            let linha = item.Linha;
            let baseLogText = this.log.baseMessageLog(linha);
            this.setValidationErrors(this.log.itemDuplicado('Placa', baseLogText));
        }
        this.exceptionHandling();
    }


    /**
     * @description Valida se as placas conferem com os IDs das implantações
     * 
     * @throws Placa não confere com o ID
     */
    async validaPlacaIdImplantacao() {
        this.isRecebimentos();
        let veiculoImplantacaoRepository = new VeiculoImplantacaoRepository();
        let result = await veiculoImplantacaoRepository.validaPlacaVinculadaForn('implantacaoId', this.recebimentos, this.fornecedorId);
        for (let item of result) {
            let linha = item.Linha;
            let implantacaoId = item.CodigoImplantacao;
            let baseLogText = this.log.baseMessageLog(linha);
            this.setValidationErrors(this.log.placaIdImplantacao('Placa', implantacaoId, baseLogText));
        }
        this.exceptionHandling();
    }

    /**
     * @description Monta o objeto a ser inserido
     *
     * @returns {codigoImplantacao: any, dataEntrega: any}
     */
    getPayloadToSave() {
        this.isRecebimentos();
        let payload = {
            codigoUsuario: this.usuarioId,
            recebimentos: []
        };
        for (const item of this.recebimentos) {
            let itemPayload = {};
            itemPayload.codigoImplantacao = item.implantacaoId;
            itemPayload.dataEntrega = DateUtils.getDateFromString(item.dataEntrega, '/');
            payload.recebimentos.push(itemPayload);
        }

        return payload;
    }

}
