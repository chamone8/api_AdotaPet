const ImportHelperBase = require('./importHelperBase');
const CommonValidacao = require('../../../domain/utils/commonValidacao');
const ChassiValidacao = require('../../../domain/utils/chassiValidacao');
const PdiLog = require('./fileLog/veiculoPdiLog');
const DateUtils = require('../../../domain/utils/dateUtils');
const VeiculoImplantacaoRepository = require('../../../domain/repository/veiculoImplantacaoRepository');
const { FaturamentoArquivoPostResponse, ItemFaturamentoArquivo } = require('../../../domain/dto/faturamentoAqruivoPostDTO');

module.exports = class ImportaPDI extends ImportHelperBase {
    /**
     * Creates an instance of ImportaPDI.
     * @param {*} tipoPDI recebe o tipo do PDI (CONCLUSAO_ACESSORIO, REGISTRO_ENTRADA_NO_PDI, REGISTRO_PDI_NO_PDI)
     * @param {*} arquivo
     * @param {*} abaIndex aba do arquivo que sera recuperado
     */
    constructor(tipoPDI, arquivo, usuarioId, abaIndex) {
        const colunas = [
            {
                nomeObj: 'codigoImplantacao',
                colunaNome: 'Código implantação',
                isDate: false
            },
            {
                nomeObj: 'chassi',
                colunaNome: 'Chassi',
                isDate: false
            },
            {
                nomeObj: 'modelo',
                colunaNome: 'Modelo',
                isDate: false
            },
            {
                nomeObj: 'corTonalidade',
                colunaNome: 'Cor/Tonalidade',
                isDate: false
            },
            {
                nomeObj: 'ano',
                colunaNome: 'Ano',
                isDate: false
            },
            {
                nomeObj: 'acessorios',
                colunaNome: 'Acessórios',
                isDate: false
            },
            {
                nomeObj: 'entradaNoPatio',
                colunaNome: 'Entrada no pátio',
                isDate: true
            },
            {
                nomeObj: 'vaga',
                colunaNome: 'Vaga',
                isDate: false
            },
            {
                nomeObj: 'dataTermino',
                colunaNome: 'Conclusão Acessórios',
                isDate: true
            }
        ];

        // Se for inspecao PDI
        if (tipoPDI === 'REGISTRO_PDI_NO_PDI') {
            colunas.push(
                {
                    nomeObj: 'dataInspecaoPDI',
                    colunaNome: 'Data PDI Inspeção',
                    isDate: true
                }
            );
        } else if (tipoPDI === 'CONCLUSAO_ACESSORIO_NO_PDI') {
            colunas.push(
                {
                    nomeObj: 'dataInstalacaoAcessorios',
                    colunaNome: 'Data instalação acessórios',
                    isDate: true
                }
            );
        }
        super(colunas, abaIndex, arquivo);
        this.usuarioId = usuarioId;
        this.tipo = tipoPDI;
        this.tableModelRegistrosValidados = null;

        this.listaPDI = [];
        this.log = new PdiLog();
        this.commonValidacao = new CommonValidacao();
        this.chassiValidacao = new ChassiValidacao();
        this.baseLogText = null;
    }

    /**
     * @description Verifica se o objeto listaPDI ja foi devidamente gerado
     *
     * @throws ErrorExecption('Lista de PDI não pode ser vazio.')
     */
    isListaPDIs() {
        if (this.listaPDI.length === 0) {
            throw new ErrorExecption('Lista de PDI não pode ser vazio.');
        }
    }

    /**
     * @description Gera o objeto que pode passar pelas regras da importação
     * 
     * @returns
     */
    getListaPDI() {
        if (this.listaPDI.length > 0) {
            return this.listaPDI
        } else {
            const data = this.geraObjetoParaImportar();
            const listaPDI = [];
            for (let item of data) {
                let obj = this.getObjPorColuna(item);
                obj.linha = item['Linha'];
                listaPDI.push(obj);
            }
            this.listaPDI = listaPDI;
            return this.listaPDI;
        }
    }

    /**r
     * @description Valida a obrigatoriedade dos campos
     * 
     * @throws @throws ErrorExecption('Lista de PDI não pode ser vazio.')
     */
    validaObrigatoriedade() {
        this.isListaPDIs();
        for (const item of this.listaPDI) {
            let linha = item.linha;
            let chassi = item.chassi || '';
            let modelo = item.modelo || '';
            let corTonalidade = item.corTonalidade || '';
            let entradaNoPatio = item.entradaNoPatio || '';
            let vaga = item.vaga || '';
            let dataInspecaoPDI = item.dataInspecaoPDI || '';
            let dataInstalacaoAcessorios = item.dataInstalacaoAcessorios || '';
            this.baseLogText = this.log.baseMessageLog(linha, chassi, modelo, corTonalidade, entradaNoPatio, vaga);

            let dataAtual = new Date(DateUtils.getDateAtualFormatYYYYMMDDHHMM()).getTime();

            if (!(chassi)) {
                this.setValidationErrors(this.log.campoObrigatorio('Chassi', this.baseLogText));
            } else {
                if (!(this.chassiValidacao.tamanhoText(chassi))) {
                    this.setValidationErrors(this.log.chassiFormat(this.baseLogText));
                }
            }

            if (!(entradaNoPatio)) {
                this.setValidationErrors(this.log.campoObrigatorio(this.baseLogText, 'Entrada no pátio'));
            } else {
                let entradaNoPatioTimestamp = new Date(DateUtils.getDataFormatYYYYMMDDHHMM(entradaNoPatio)).getTime();
                if (this.tipo === 'CONCLUSAO_ACESSORIO_NO_PDI') {
                    if (!(this.commonValidacao.dateFormatDDMMYYY(entradaNoPatio))) {
                        this.setValidationErrors(this.log.dateFormat('Entrada no pátio', this.baseLogText));
                    } else if (entradaNoPatioTimestamp > dataAtual) {
                        this.setValidationErrors(this.log.dataNoFuturo(this.baseLogText));
                    }
                }
                if (this.tipo === 'REGISTRO_ENTRADA_NO_PDI') {
                    if (!(this.commonValidacao.dateFormatDDMMYYY(entradaNoPatio))) {
                        this.setValidationErrors(this.log.dateFormat('Entrada no pátio', this.baseLogText));
                    } else if (DateUtils.getDataFormatYYYYMMDDHHMM(entradaNoPatio) !== DateUtils.getDateAtualFormatYYYYMMDDHHMM()) {
                        this.setValidationErrors(this.log.dataRetroativa(this.baseLogText));
                    }
                }
            }

            if (this.tipo === 'CONCLUSAO_ACESSORIO_NO_PDI') {
                let dataInstalacaoAcessoriosTimestamp = new Date(DateUtils.getDataFormatYYYYMMDDHHMM(dataInstalacaoAcessorios)).getTime();
                if (!dataInstalacaoAcessorios) {
                    this.setValidationErrors(this.log.campoObrigatorio(this.baseLogText, 'Data Instalação Acessórios'));
                } else if (!(this.commonValidacao.dateFormatDDMMYYY(dataInstalacaoAcessorios))) {
                    this.setValidationErrors(this.log.dateFormat('Data Instalação Acessórios', this.baseLogText));
                } else if (dataInstalacaoAcessoriosTimestamp > dataAtual) {
                    this.dataAcessorioNoFuturo(this.log.dataNoFuturo(this.baseLogText));
                }
            }

            if (!(vaga) && this.tipo === 'REGISTRO_ENTRADA_NO_PDI') {
                this.setValidationErrors(this.log.campoObrigatorio(this.baseLogText, 'Vaga'));
            }

            if (this.tipo === 'REGISTRO_PDI_NO_PDI') {
                if (!dataInspecaoPDI) {
                    this.setValidationErrors(this.log.campoObrigatorio(this.baseLogText, 'Data PDI Inspeção'));
                } else if (!DateUtils.validaDataFutura(dataInspecaoPDI)) {
                    this.setValidationErrors(this.log.dataPdiRetroativa(this.baseLogText));
                }
            }

        }
        this.exceptionHandling();
        this.getTableModel();
    }

    /**
     * Valida a duplicidade dos campos
     *
     * @param {*} campo
     */
    validaDuplicidadeCampos(campo) {
        this.isListaPDIs();
        let pedidoCodigoDuplicateRecords = this.commonValidacao.checkDuplicateFields(this.listaPDI, campo);
        for (const item of pedidoCodigoDuplicateRecords) {
            let chassi = item.chassi;
            let modelo = item.modelo;
            let corTonalidade = item.cor_tonalidade;
            let entradaNoPatio = item.entrada_no_patio;
            let vaga = item.vaga;
            let linha = item.linha;
            let baseMessageLog = this.log.baseMessageLog(linha, chassi, modelo, corTonalidade, entradaNoPatio, vaga);

            this.setValidationErrors(this.log.chassiDuplicado(baseMessageLog));
        }
        this.exceptionHandling();
    }

    /**
     * Valida se o chassi informado existe na base
     *
     */
    async validaExistenciaChassiLocavia() {
        this.isListaPDIs();
        let veiculoImplantacaoRepository = new VeiculoImplantacaoRepository();
        let resultValidacaoChassi = await veiculoImplantacaoRepository.validarDadosPDI('CHASSI_NAO_ENCONTRADO', this.tableModelRegistrosValidados);
        for (let item of resultValidacaoChassi) {
            let chassi = item.Chassi;
            let modelo = item.Modelo;
            let corTonalidade = item.Cor;
            let entradaNoPatio = item.DataEntradaPatioAux;
            let vaga = item.VagaPatio;
            let linha = item.Linha;
            let baseMessageLog = this.log.baseMessageLog(linha, chassi, modelo, corTonalidade, entradaNoPatio, vaga);

            this.setValidationErrors(this.log.chassiNaoEncontradoBaseDeDados(baseMessageLog));
        }

        this.exceptionHandling();
    }

    /**
     * Valida a consistencia dos dados
     *
     */
    async validaConsistencia() {
        this.isListaPDIs();
        let veiculoImplantacaoRepository = new VeiculoImplantacaoRepository();
        let resultValidacaoConsistencia = await veiculoImplantacaoRepository.validarDadosPDI('CERTIFICAR_CONSISTENCIA_DADOS', this.tableModelRegistrosValidados);
        for (let item of resultValidacaoConsistencia) {
            let chassi = item.Chassi;
            let modelo = item.Modelo;
            let corTonalidade = item.Cor;
            let entradaNoPatio = item.DataEntradaPatioAux;
            let vaga = item.VagaPatio;
            let linha = item.Linha;
            let baseMessageLog = this.log.baseMessageLog(linha, chassi, modelo, corTonalidade, entradaNoPatio, vaga);

            this.setValidationErrors(this.log.consistenciaDadoDataPrevisao(baseMessageLog));
        }
        this.exceptionHandling();
    }

    /**
     * Verifica a existencia dos dados
     *
     */
    async validaDadosExistentes() {
        this.isListaPDIs();
        let veiculoImplantacaoRepository = new VeiculoImplantacaoRepository();
        let resultValidacaoDadosExistente = await veiculoImplantacaoRepository.validarDadosPDI('DADOS_EXISTENTE', this.tableModelRegistrosValidados, this.tipo);
        for (let item of resultValidacaoDadosExistente) {
            let chassi = item.Chassi;
            let modelo = item.Modelo;
            let corTonalidade = item.Cor;
            let entradaNoPatio = item.DataEntradaPatioAux;
            let vaga = item.VagaPatio;
            let linha = item.Linha;
            let baseMessageLog = this.log.baseMessageLog(linha, chassi, modelo, corTonalidade, entradaNoPatio, vaga);

            this.setValidationErrors(this.log.dadosExistente(baseMessageLog));
        }

        this.exceptionHandling();
    }

    /**
     * Verifica a data inspeção do PDI
     *
     */
    async validaDataTermino() {
        this.isListaPDIs();
        let veiculoImplantacaoRepository = new VeiculoImplantacaoRepository();
        let resultValidacaoDadosExistente = await veiculoImplantacaoRepository.validarDadosPDI('DATA_TERMINO', this.tableModelRegistrosValidados);
        for (let item of resultValidacaoDadosExistente) {
            let chassi = item.Chassi;
            let modelo = item.Modelo;
            let corTonalidade = item.Cor;
            let entradaNoPatio = item.DataEntradaPatioAux;
            let vaga = item.VagaPatio;
            let linha = item.Linha;
            let baseMessageLog = this.log.baseMessageLog(linha, chassi, modelo, corTonalidade, entradaNoPatio, vaga);

            this.setValidationErrors(this.log.dataPdiMenorConclusao(baseMessageLog));
        }

        this.exceptionHandling();
    }

    /**
    * Monta o tableModel para as validaçoes
    *
    */
    getTableModel() {
        this.isListaPDIs();
        this.tableModelRegistrosValidados = this.listaPDI.map(value => {
            return {
                linha: value.linha,
                codigoImplantacao: value.codigoImplantacao,
                dataEntradaPatio: DateUtils.getDataFormatYYYYMMDD(value.entradaNoPatio),
                dataEntradaPatioAux: value.entradaNoPatio,
                vagaPatio: value.vaga,
                instalacaoAcessorios: (value.acessorios) ? true : false,
                dataInstalacaoAcessorios: DateUtils.getDataFormatYYYYMMDD(value.dataInstalacaoAcessorios),
                dataInstalacaoAcessoriosAux: value.dataInstalacaoAcessorios,
                dataPDI: DateUtils.getDataFormatYYYYMMDD(value.dataInspecaoPDI)
            };
        });
    }

    /**
     * @description Monta o objeto a ser inserido
     *
     * @returns array
     */
    getPayloadToSave() {
        this.isListaPDIs();
        let payload = new FaturamentoArquivoPostResponse();
        payload.usuarioId = this.usuarioId;
        payload.tipo = this.tipo;

        for (const item of this.listaPDI) {
            let obj = {};
            obj.codigoImplantacao = parseInt(item.codigoImplantacao);
            obj.dataEntradaPatio = DateUtils.getDataFormatYYYYMMDD(item.entradaNoPatio);
            obj.vagaPatio = item.vaga;
            obj.instalacaoAcessorios = item.acessorios ? true : false;
            obj.dataInstalacaoAcessorios = DateUtils.getDataFormatYYYYMMDD(item.dataInstalacaoAcessorios);
            obj.dataPDI = DateUtils.getDataFormatYYYYMMDD(item.dataInspecaoPDI);

            payload.itens.push(obj);
        }
        return payload.itens;
    }

}