const ImportHelperBase = require('./importHelperBase');
const DateUtils = require('../../../domain/utils/dateUtils');
const InformeFaturamentoLog = require('./fileLog/informeFaturamentoLog')
const CommonValidacao = require('../../../domain/utils/commonValidacao');
const ChassiValidacao = require('../../../domain/utils/chassiValidacao');
const FaturamentoRepository = require('../../../domain/repository/faturamentoRepository');
const { FaturamentoArquivoPostResponse, ItemFaturamentoArquivo } = require('../../../domain/dto/faturamentoAqruivoPostDTO');

module.exports = class ImportaInforme extends ImportHelperBase {

    constructor(arquivo, fornecedorId, usuarioId, tipo, abaIndex) {
        const colunas = [
            {
                nomeObj: 'pedido',
                colunaNome: 'Pedido',
                isDate: false
            },
            {
                nomeObj: 'codigo',
                colunaNome: 'Código',
                isDate: false
            },
            {
                nomeObj: 'dataFaturamento',
                colunaNome: 'Data de Faturamento',
                tipo: 'string',
                required: true
            },
            {
                nomeObj: 'cnpj_faturamento',
                colunaNome: 'CNPJ Faturamento',
                isDate: false
            },
            {
                nomeObj: 'negocio',
                colunaNome: 'Negócio',
                isDate: false
            },
            {
                nomeObj: 'modelo',
                colunaNome: 'Modelo',
                isDate: false
            },
            {
                nomeObj: 'ano_fabricacao_modelo',
                colunaNome: 'Ano Fabricação',
                isDate: false
            },
            {
                nomeObj: 'cor',
                colunaNome: 'Cor',
                isDate: false
            },
            {
                nomeObj: 'valor_veiculo',
                colunaNome: 'Valor Veículo',
                isDate: false
            },
            {
                nomeObj: 'codigo_montadora',
                colunaNome: 'Número Controle',
                isDate: false
            },
            {
                nomeObj: 'numero_nota_fiscal',
                colunaNome: 'Número Nota Fiscal',
                isDate: false
            },
            {
                nomeObj: 'dataEmissaoNotaFiscal',
                colunaNome: 'Data Emissão Nota Fiscal',
                isDate: true
            },
            {
                nomeObj: 'chave_acesso_nota_fiscal',
                colunaNome: 'Chave Acesso Nota Fiscal',
                isDate: false
            },
            {
                nomeObj: 'chassi',
                colunaNome: 'Chassi',
                isDate: false
            },
            {
                nomeObj: 'cnpj_emitente_nota_fiscal',
                colunaNome: 'CNPJ Emitente NF',
                isDate: false
            },
            {
                nomeObj: 'cnpjEmpresaFaturamento',
                colunaNome: 'CNPJ Empresa Faturamento',
                isDate: false
            },
            // {
            //     nomeObj: 'valorFrete',
            //     colunaNome: 'Valor Frete',
            //     required: true
            // }
        ];
        super(colunas, abaIndex, arquivo);
        this.fornecedorId = fornecedorId;
        this.usuarioId = usuarioId;
        this.tipo = tipo;
        this.faturamentos = [];
        this.log = new InformeFaturamentoLog();
        this.commonValidacao = new CommonValidacao();
        this.chassiValidacao = new ChassiValidacao();
        this.baseLogText = null;
        this.tamMaxMontadora = 20;
    }

    isFaturamentos() {
        if (this.faturamentos.length === 0) {
            throw new ErrorExecption('Faturamentos não pode ser vazio.');
        }
    }

    getFaturamentos() {
        if (this.faturamentos.length > 0) {
            return this.faturamentos
        } else {
            const data = this.geraObjetoParaImportar();
            const faturamentos = [];
            for (let item of data) {
                let obj = this.getObjPorColuna(item);
                obj.joinedColumns = `${obj.pedido}${obj.codigo}`;
                obj.linha = item['Linha'];
                faturamentos.push(obj);
            }
            this.faturamentos = faturamentos;
            return this.faturamentos;
        }
    }

    validaObrigatoriedade() {
        this.isFaturamentos();
        for (const item of this.faturamentos) {
            let linha = item.linha;
            let pedido = item.pedido;
            let codigo = item.codigo;
            let codigoMontadora = item.codigo_montadora;
            let numeroNF = item.numero_nota_fiscal;
            let valorVeiculo = item.valor_veiculo;
            let dataEmissaoNotaFiscal = item.dataEmissaoNotaFiscal;
            let chassi = item.chassi;
            let dataFaturamento = item.dataFaturamento;
            let anoFabricacao = item.ano_fabricacao_modelo;
            let chaveAcessoNotaFiscal = item.chave_acesso_nota_fiscal;
            let cnpjFaturamento = item.cnpj_faturamento;
            let cnpjEmpresaFaturamento = item.cnpjEmpresaFaturamento;
            // let valorFrete = item.valorFrete;
            this.baseLogText = this.log.baseMessageLog(linha, pedido, codigo, codigoMontadora, numeroNF, chassi);

            if (!(pedido)) {
                this.setValidationErrors(this.log.campoObrigatorio('Pedido', this.baseLogText));
            } else {
                if (!(this.commonValidacao.numericValue(pedido))) {
                    this.setValidationErrors(this.log.numericoFormat('Pedido', this.baseLogText));
                }
            }

            if (!(codigo)) {
                this.setValidationErrors(this.log.campoObrigatorio('Código', this.baseLogText));
            } else {
                if (!(this.commonValidacao.numericValue(codigo))) {
                    this.setValidationErrors(this.log.numericoFormat('Código', this.baseLogText))
                }
            }

            if (!(valorVeiculo)) {
                this.setValidationErrors(this.log.campoObrigatorio('Valor Veículo', this.baseLogText));
            } else {
                if (!(this.commonValidacao.currencyNumericValue(valorVeiculo))) {
                    this.setValidationErrors(this.log.currencyFormat('Valor Veículo', this.baseLogText));
                }
            }
            if (!(numeroNF)) {
                this.setValidationErrors(this.log.campoObrigatorio('Número Nota Fiscal', this.baseLogText));
            } else {
                if (!(this.commonValidacao.numericValue(numeroNF))) {
                    this.setValidationErrors(this.log.numericoFormat('Número Nota Fiscal', this.baseLogText));
                }
            }
            if (!(dataEmissaoNotaFiscal)) {
                this.setValidationErrors(this.log.campoObrigatorio('Data Emissão Nota Fiscal', this.baseLogText));
            } else {
                if (!(this.commonValidacao.dateFormatDDMMYYY(dataEmissaoNotaFiscal))) {
                    this.setValidationErrors(this.log.dateFormat('Data Emissão Nota Fiscal', this.baseLogText));
                }
            }
            if (!(chassi)) {
                this.setValidationErrors(this.log.campoObrigatorio('Chassi', this.baseLogText));
            } else {
                if (!(this.chassiValidacao.tamanhoText(chassi))) {
                    this.setValidationErrors(this.log.chassiFormat(this.baseLogText));
                }
            }

            if (!(dataFaturamento)) {
                this.setValidationErrors(this.log.campoObrigatorio('Data de Faturamento', this.baseLogText));
            } else {
                if (!(this.commonValidacao.dateFormatDDMMYYY(dataFaturamento))) {
                    this.setValidationErrors(this.log.dateFormat('Data de Faturamento', this.baseLogText));
                }
            }
            if (!(anoFabricacao)) {
                this.setValidationErrors(this.log.campoObrigatorio('Ano Fabricação', this.baseLogText));
            } else {
                if (!(this.commonValidacao.yearFormat(anoFabricacao))) {
                    this.setValidationErrors(this.log.anoFabricacaoFormat(this.baseLogText));
                }
            }
            if (!(chaveAcessoNotaFiscal)) {
                this.setValidationErrors(this.log.campoObrigatorio('Chave Acesso Nota Fiscal', this.baseLogText));
            } else {
                if (chaveAcessoNotaFiscal.length > 44) {
                    this.setValidationErrors(this.log.numeroCaracteresChaveAcesso(this.baseLogText));
                }
            }

            if (codigoMontadora) {
                if (codigoMontadora.toString().length > this.tamMaxMontadora) {
                    this.setValidationErrors(this.log.codigoMontadoraMaiorLimit(this.baseLogText, this.tamMaxMontadora));
                }
                if (this.commonValidacao.caracterEspecial(codigoMontadora)) {
                    this.setValidationErrors(this.log.numeroPedidoCaracterEspecial(this.baseLogText));
                }
            }

            if (!cnpjFaturamento) {
                this.setValidationErrors(this.log.campoObrigatorio('CNPJ Faturamento', this.baseLogText));
            } else if (!cnpjEmpresaFaturamento) {
                this.setValidationErrors(this.log.campoObrigatorio('CNPJ Empresa Faturamento', this.baseLogText));
            } else if (cnpjFaturamento !== cnpjEmpresaFaturamento) {
                this.setValidationErrors(this.log.cnpjDiferente(this.baseLogText));
            }
            // if (!(valorFrete)) {
            //     this.setValidationErrors(this.log.campoObrigatorio('Valor Frete', this.baseLogText));
            // } else {
            //     if (!(this.commonValidacao.currencyNumericValue(valorFrete))) {
            //         this.setValidationErrors(this.log.currencyFormat('Valor Frete', this.baseLogText));
            //     }
            // }


        }
        this.exceptionHandling();
    }

    validaCodigoDuplicado() {
        this.isFaturamentos();
        let pedidoCodigoDuplicateRecords = this.commonValidacao.checkDuplicateFields(this.faturamentos, 'joinedColumns');
        for (const item of pedidoCodigoDuplicateRecords) {
            let linha = item.linha;
            let pedido = item.pedido;
            let codigo = item.codigo;
            let codigoMontadora = item.codigo_montadora;
            let numeroNF = item.numero_nota_fiscal;
            this.baseLogText = this.log.baseMessageLog(linha, pedido, codigo, codigoMontadora, numeroNF);
            this.setValidationErrors(this.log.chaveDuplicada(`Pedido e Código`, baseLogText));
        }
        this.exceptionHandling();
    }

    async validaPedidoInvalido() {
        this.isFaturamentos();
        let faturamentoRepository = new FaturamentoRepository();
        let resultValidacaoPedidoInvalido = await faturamentoRepository.validacaoFaturamento('PEDIDO_INVALIDO', this.faturamentos, this.fornecedorId);
        for (let item of resultValidacaoPedidoInvalido) {
            let linha = item.Linha;
            let pedido = item.CodigoPedido;
            let codigo = item.CodigoImplantacao;
            let chassi = item.Chassi;
            const baseLogText = this.log.baseMessageLog(linha, pedido, codigo, null, null, chassi);
            this.setValidationErrors(this.log.codigoPedidoInvalido(baseLogText));
        }
        this.exceptionHandling();
    }

    async validaChassiExiste() {
        this.isFaturamentos();
        let faturamentoRepository = new FaturamentoRepository();
        let resultadoValidacaoChassiExistente = await faturamentoRepository.validacaoFaturamento('CHASSI_EXISTENTE', this.faturamentos, this.fornecedorId);
        for (let item of resultadoValidacaoChassiExistente) {
            let linha = item.Linha;
            let pedido = item.CodigoPedido;
            let codigo = item.CodigoImplantacao;
            let chassi = item.Chassi;
            let baseLogText = this.log.baseMessageLog(linha, pedido, codigo, null, null, chassi);
            this.setValidationErrors(this.log.chassiExistente(baseLogText));
        }
        this.exceptionHandling();
    }

    async validaCnpjExistente() {
        this.isFaturamentos();
        let faturamentoRepository = new FaturamentoRepository();
        let resultadoValidacaoCnpjNaoLocalizado = await faturamentoRepository.validacaoFaturamento('CNPJ_NAO_LOCALIZADO', this.faturamentos, this.fornecedorId);
        for (let item of resultadoValidacaoCnpjNaoLocalizado) {
            let linha = item.Linha;
            let pedido = item.CodigoPedido;
            let codigo = item.CodigoImplantacao;
            let chassi = item.Chassi;
            let baseLogText = this.log.baseMessageLog(linha, pedido, codigo, null, null, chassi);
            this.setValidationErrors(this.log.cnpjNaoLocalizado(baseLogText));
        }
        this.exceptionHandling();
    }

    getPayloadToSave() {
        this.isFaturamentos();
        let response = {
            method: 'PATCH',
            href: '/veiculosfaturamentos',
            payload: null
        };

        let payload = new FaturamentoArquivoPostResponse();
        payload.usuarioId = this.usuarioId;
        payload.tipo = this.tipo;

        for (const item of this.faturamentos) {
            let itemPayload = new ItemFaturamentoArquivo();
            itemPayload.id = parseInt(item.codigo);
            itemPayload.numeroControle = item.codigo_montadora.toString();
            itemPayload.valorVeiculo = item.valor_veiculo ? parseFloat(item.valor_veiculo.toString().replace(',', '.')) : null; itemPayload.numeroNotaFiscal = parseInt(item.numero_nota_fiscal);
            itemPayload.dataEmissaoNotaFiscal = DateUtils.getDataFormatYYYYMMDD(item.dataEmissaoNotaFiscal);
            itemPayload.dataFaturamento = DateUtils.getDataFormatYYYYMMDD(item.dataFaturamento);
            itemPayload.chassi = item.chassi;
            itemPayload.anoModelo = item.ano_fabricacao_modelo;
            itemPayload.chaveAcessoNotaFiscal = item.chave_acesso_nota_fiscal.toString();
            itemPayload.cnpjEmitenteNf = item.cnpj_emitente_nota_fiscal;
            // itemPayload.valorFrete = item.valorFrete;
            payload.itens.push(itemPayload);
        }
        response.payload = payload;
        return response;
    }

}