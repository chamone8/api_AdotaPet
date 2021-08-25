'use strict';
const { ErrorExecption, BadRequestException } = require('../../exception');
const DateUtils = require('../../../domain/utils/dateUtils');
const _ = require('lodash');
const XLSXUtil = require('../../../domain/utils/xlsx'),
{
    MimeTypeEnum,
} = require('../../../domain/enum/mimeTypeEnum');
const xlsx = require('node-xlsx')

module.exports = class ImportHelperBase {

    /**
     * @description Constroi o objeto com as colunas esperadas no header do arquivo
     * @param {*} colunas 
     */
    constructor(colunas, abaIndex, arquivo) {
        this.validationErrors = [];
        this.abaIndex = abaIndex;
        this.arquivo = this.validarArquivoImportado(arquivo);
        const objetoColunas = {
            tratamentoColunas: [],
            colunas: []
        };
        if (colunas instanceof Array && colunas.length <= 0) {
            throw new ErrorExecption('Favor informar um array com as colunas na ordem desejada');
        }
        objetoColunas.tratamentoColunas = colunas;
        objetoColunas.colunas = colunas.map(coluna => {
            return coluna.colunaNome
        });
        this.headersEsperados = objetoColunas;
    }

    /**
     * Valida o arquivo a ser importado
     * @param {*} file 
     */
    validarArquivoImportado(file) {
        if (!(file.value)) throw new ErrorExecption('Anexo do arquivo é obrigatório.');
        if (!(file.value.mimetype) && (typeof file.value.mimetype !== 'string')) throw new ErrorExecption('Não foi possível recuperar o tipo do arquivo.');

        let mimeType = file.value.mimetype.toUpperCase();
        if (!(MimeTypeEnum.isDefined(mimeType))) throw new ErrorExecption('Extensão do arquivo não suportada');

        return this.recuperaDadosArquivo(file)
    }

    /**
     * 
     * @param {*} file 
     * @returns dados do arquivo 
     */
    recuperaDadosArquivo(file) {
        var obj = xlsx.parse(file.value.buffer);
        return obj[this.abaIndex].data;
    }

    /**
     * @description Seta a mensagem de erro a ser validada futuramente
     *
     * @param {*} logErr
     */
    setValidationErrors(logErr) {
        this.validationErrors.push(logErr);
    }

    /**
     * @description Retorna as mensagens de erro
     *
     * @returns
     */
    getValidationErrors() {
        return this.validationErrors;
    }

    /**
     *@description Retorna o arquivo
     *
     * @returns
     */
    getArquivo() {
        return this.arquivo;
    }

    /**
     * @description Verifica a integridade co cabeçalho do arquivo
     * @returns true | false
     */
    validaConsistenciaHeaders() {
        const cabecalhoArquivo = this.arquivo.shift();
        return _.isEqual(cabecalhoArquivo, this.headersEsperados.colunas);
    }

    /**
     * @description Gera um objeto de acordo com as colunas esperadas utilizando o parametro nomeObj
     *
     * @param {*} item
     * @returns
     */
    getObjPorColuna(item) {
        let obj = {};
        for (let coluna of this.headersEsperados.tratamentoColunas) {
            const valorLinhaArquivo = item[coluna.colunaNome];
            if (coluna.isDate && typeof valorLinhaArquivo === 'number') {
                obj[coluna.nomeObj] = DateUtils.excelDateToJSDate(valorLinhaArquivo) || null;
            } else {
                obj[coluna.nomeObj] = valorLinhaArquivo || null;
            }
        }
        return obj;
    }

    /**
     *@description Prepara o objeto para ser tratado antes da importação
     *
     * @returns
     */
    geraObjetoParaImportar() {
        let dataAux = this.geraDataAux();
        let arrayObjImport = [];
        dataAux.forEach(aux => {
            let obj = {};
            for (let i = 0; i < aux.length; i++) {
                if (i === aux.length - 1) {
                    obj['Linha'] = aux[i];
                } else {
                    obj[this.headersEsperados.colunas[i]] = aux[i]
                }
            }
            arrayObjImport.push(obj);
        });
        return arrayObjImport;
    }

    /**
     * @description Gera um objeto auxiliar que será utilizado para criar o objeto possível de tratamento
     *
     * @returns
     */
    geraDataAux() {
        const dataAux = [];
        let lineCounter = 2;
        this.arquivo.forEach(linha => {
            if (!_.isEmpty(linha)) {
                let array = [];
                for (let i = 0; i < linha.length; i++) {
                    array.push(linha[i])
                }
                array.push(lineCounter);
                dataAux.push(array);
            }
            lineCounter++;
        });
        return dataAux;
    }

    /**
     * @description Faz o tratamento dos erros ocorridos e retorna um arquivo txt descrevendo os mesmos
     *
     * @throws error
     */
    exceptionHandling() {
        if (this.getValidationErrors().length > 0) {
            let error = new BadRequestException('Erro na validação dos dados do arquivo.');
            error.data = `${Base64.encode([this.getValidationErrors().join('\n')])}`;
            throw error;
        }
    }
}