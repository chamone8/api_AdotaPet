const SocioAmbientalLog = require('./fileLog/socioAmbientalLog');
const ImportHelperBase = require('./importHelperBase');
const TipoArquivoSocioAmbientalEnum = require('../../../domain/enum/tipoArquivoSocioAmbientalEnum');
const dateUtils = require('../../../domain/utils/dateUtils');

module.exports = class ImportaSocioAmbiental extends ImportHelperBase {
    constructor(arquivo, abaIndex, usuarioId) {
        const colunas = [
            {
                nomeObj: 'age',
                colunaNome: 'AGE',
                isDate: false
            },
            {
                nomeObj: 'gender',
                colunaNome: 'GENDER',
                isDate: false
            },
            {
                nomeObj: 'cceb',
                colunaNome: 'CCEB',
                isDate: false
            },
            {
                nomeObj: 'zeit',
                colunaNome: 'ZEIT',
                isDate: true
            },
            {
                nomeObj: 'locid',
                colunaNome: 'LOCID',
                isDate: false
            },
            {
                nomeObj: 'codFornecedor',
                colunaNome: 'COD FORNECEDOR',
                isDate: false
            },
            {
                nomeObj: 'location',
                colunaNome: 'LOCATION',
                isDate: false
            },
            {
                nomeObj: 'q1',
                colunaNome: 'Q1',
                isDate: false
            },
            {
                nomeObj: 'q2',
                colunaNome: 'Q2',
                isDate: false
            },
            {
                nomeObj: 'q2Exclusive',
                colunaNome: 'Q2_EXCLUSIVE',
                isDate: false
            },
            {
                nomeObj: 'q2Other',
                colunaNome: 'Q2_OTHER',
                isDate: false
            },
            {
                nomeObj: 'q3',
                colunaNome: 'Q3',
                isDate: false
            },
            {
                nomeObj: 'q4_1',
                colunaNome: 'Q4_1',
                isDate: false
            },
            {
                nomeObj: 'q4_2',
                colunaNome: 'Q4_2',
                isDate: false
            },
            {
                nomeObj: 'q4_3',
                colunaNome: 'Q4_3',
                isDate: false
            },
            {
                nomeObj: 'q4_4',
                colunaNome: 'Q4_4',
                isDate: false
            },
            {
                nomeObj: 'q4_5',
                colunaNome: 'Q4_5',
                isDate: false
            },
            {
                nomeObj: 'q4_6',
                colunaNome: 'Q4_6',
                isDate: false
            },
            {
                nomeObj: 'q4_7',
                colunaNome: 'Q4_7',
                isDate: false
            },
            {
                nomeObj: 'q4_8',
                colunaNome: 'Q4_8',
                isDate: false
            },
            {
                nomeObj: 'q4Exclusive',
                colunaNome: 'Q4_EXCLUSIVE',
                isDate: false
            },
            {
                nomeObj: 'q4Type',
                colunaNome: 'Q4_TYPE',
                isDate: false
            },
            {
                nomeObj: 'q4Other',
                colunaNome: 'Q4_OTHER',
                isDate: false
            },
            {
                nomeObj: 'q5',
                colunaNome: 'Q5',
                isDate: false
            },
            {
                nomeObj: 'q6',
                colunaNome: 'Q6',
                isDate: false
            },
            {
                nomeObj: 'q7',
                colunaNome: 'Q7',
                isDate: false
            },
            {
                nomeObj: 'q8',
                colunaNome: 'Q8',
                isDate: false
            },
            {
                nomeObj: 'q8Exclusive',
                colunaNome: 'Q8_EXCLUSIVE',
                isDate: false
            },
            {
                nomeObj: 'q8Other',
                colunaNome: 'Q8_OTHER',
                isDate: false
            },
            {
                nomeObj: 'q9',
                colunaNome: 'Q9',
                isDate: false
            },
            {
                nomeObj: 'q10',
                colunaNome: 'Q10',
                isDate: false
            },
            {
                nomeObj: 'q11',
                colunaNome: 'Q11',
                isDate: false
            },
            {
                nomeObj: 'q12',
                colunaNome: 'Q12',
                isDate: false
            },
            {
                nomeObj: 'q13',
                colunaNome: 'Q13',
                isDate: false
            },
            {
                nomeObj: 'q13Other',
                colunaNome: 'Q13_OTHER',
                isDate: false
            },
            {
                nomeObj: 'q14',
                colunaNome: 'Q14',
                isDate: false
            },
            {
                nomeObj: 'q15_1',
                colunaNome: 'Q15_1',
                isDate: false
            },
            {
                nomeObj: 'q15_2',
                colunaNome: 'Q15_2',
                isDate: false
            },
            {
                nomeObj: 'q15_3',
                colunaNome: 'Q15_3',
                isDate: false
            },
            {
                nomeObj: 'q15_4',
                colunaNome: 'Q15_4',
                isDate: false
            },
            {
                nomeObj: 'q15_5',
                colunaNome: 'Q15_5',
                isDate: false
            },
            {
                nomeObj: 'q15_6',
                colunaNome: 'Q15_6',
                isDate: false
            },
            {
                nomeObj: 'q15_7',
                colunaNome: 'Q15_7',
                isDate: false
            },
            {
                nomeObj: 'q15_8',
                colunaNome: 'Q15_8',
                isDate: false
            },
            {
                nomeObj: 'q15_9',
                colunaNome: 'Q15_9',
                isDate: false
            },
            {
                nomeObj: 'q15_10',
                colunaNome: 'Q15_10',
                isDate: false
            },
            {
                nomeObj: 'q15Type',
                colunaNome: 'Q15_TYPE',
                isDate: false
            },
            {
                nomeObj: 'q15Other',
                colunaNome: 'Q15_OTHER',
                isDate: false
            },
            {
                nomeObj: 'q16',
                colunaNome: 'Q16',
                isDate: false
            },
            {
                nomeObj: 'q17_1_1',
                colunaNome: 'Q17_1_1',
                isDate: false
            },
            {
                nomeObj: 'q17_2_1',
                colunaNome: 'Q17_2_1',
                isDate: false
            },
            {
                nomeObj: 'q17_3_1',
                colunaNome: 'Q17_3_1',
                isDate: false
            },
            {
                nomeObj: 'q18',
                colunaNome: 'Q18',
                isDate: false
            },
            {
                nomeObj: 'q19',
                colunaNome: 'Q19',
                isDate: false
            },
            {
                nomeObj: 'q20',
                colunaNome: 'Q20',
                isDate: false
            },
            {
                nomeObj: 'q21',
                colunaNome: 'Q21',
                isDate: false
            },
            {
                nomeObj: 'q22_1',
                colunaNome: 'Q22_1',
                isDate: false
            },
            {
                nomeObj: 'q22_2',
                colunaNome: 'Q22_2',
                isDate: false
            },
            {
                nomeObj: 'q22_3',
                colunaNome: 'Q22_3',
                isDate: false
            },
            {
                nomeObj: 'q22_4',
                colunaNome: 'Q22_4',
                isDate: false
            },
            {
                nomeObj: 'q22_5',
                colunaNome: 'Q22_5',
                isDate: false
            },
            {
                nomeObj: 'q22_6',
                colunaNome: 'Q22_6',
                isDate: false
            },
            {
                nomeObj: 'q22_7',
                colunaNome: 'Q22_7',
                isDate: false
            },
            {
                nomeObj: 'q22_8',
                colunaNome: 'Q22_8',
                isDate: false
            },
            {
                nomeObj: 'q22_9',
                colunaNome: 'Q22_9',
                isDate: false
            },
            {
                nomeObj: 'q22_10',
                colunaNome: 'Q22_10',
                isDate: false
            },
            {
                nomeObj: 'q22_11',
                colunaNome: 'Q22_11',
                isDate: false
            },
            {
                nomeObj: 'q22_12',
                colunaNome: 'Q22_12',
                isDate: false
            },
            {
                nomeObj: 'q22Exclusive',
                colunaNome: 'Q22_EXCLUSIVE',
                isDate: false
            },
            {
                nomeObj: 'q23',
                colunaNome: 'Q23',
                isDate: false
            },
            {
                nomeObj: 'q24',
                colunaNome: 'Q24',
                isDate: false
            },
            {
                nomeObj: 'q25',
                colunaNome: 'Q25',
                isDate: false
            },
            {
                nomeObj: 'q26_1',
                colunaNome: 'Q26_1',
                isDate: false
            },
            {
                nomeObj: 'q26_2',
                colunaNome: 'Q26_2',
                isDate: false
            },
            {
                nomeObj: 'q26_3',
                colunaNome: 'Q26_3',
                isDate: false
            },
            {
                nomeObj: 'q26_4',
                colunaNome: 'Q26_4',
                isDate: false
            },
            {
                nomeObj: 'q26_5',
                colunaNome: 'Q26_5',
                isDate: false
            },
            {
                nomeObj: 'q26_6',
                colunaNome: 'Q26_6',
                isDate: false
            },
            {
                nomeObj: 'q26_7',
                colunaNome: 'Q26_7',
                isDate: false
            },
            {
                nomeObj: 'q26Exclusive',
                colunaNome: 'Q26_EXCLUSIVE',
                isDate: false
            },
            {
                nomeObj: 'q27',
                colunaNome: 'Q27',
                isDate: false
            },
            {
                nomeObj: 'q28_1',
                colunaNome: 'Q28_1',
                isDate: false
            },
            {
                nomeObj: 'q28_2',
                colunaNome: 'Q28_2',
                isDate: false
            },
            {
                nomeObj: 'q28_3',
                colunaNome: 'Q28_3',
                isDate: false
            },
            {
                nomeObj: 'q28_4',
                colunaNome: 'Q28_4',
                isDate: false
            },
            {
                nomeObj: 'q28_5',
                colunaNome: 'Q28_5',
                isDate: false
            },
            {
                nomeObj: 'q28Type',
                colunaNome: 'Q28_TYPE',
                isDate: false
            },
            {
                nomeObj: 'q28Other',
                colunaNome: 'Q28_OTHER',
                isDate: false
            },
            {
                nomeObj: 'q29_1',
                colunaNome: 'Q29_1',
                isDate: false
            },
            {
                nomeObj: 'q29_2',
                colunaNome: 'Q29_2',
                isDate: false
            },
            {
                nomeObj: 'q29_3',
                colunaNome: 'Q29_3',
                isDate: false
            },
            {
                nomeObj: 'q29_4',
                colunaNome: 'Q29_4',
                isDate: false
            },
            {
                nomeObj: 'q29Type',
                colunaNome: 'Q29_TYPE',
                isDate: false
            },
            {
                nomeObj: 'q29Other',
                colunaNome: 'Q29_OTHER',
                isDate: false
            },
            {
                nomeObj: 'q30',
                colunaNome: 'Q30',
                isDate: false
            },
            {
                nomeObj: 'q31_1',
                colunaNome: 'Q31_1',
                isDate: false
            },
            {
                nomeObj: 'q31_2',
                colunaNome: 'Q31_2',
                isDate: false
            },
            {
                nomeObj: 'q31_3',
                colunaNome: 'Q31_3',
                isDate: false
            },
            {
                nomeObj: 'q31_4',
                colunaNome: 'Q31_4',
                isDate: false
            },
            {
                nomeObj: 'q31_5',
                colunaNome: 'Q31_5',
                isDate: false
            },
            {
                nomeObj: 'q31_6',
                colunaNome: 'Q31_6',
                isDate: false
            },
            {
                nomeObj: 'q31Type',
                colunaNome: 'Q31_TYPE',
                isDate: false
            },
            {
                nomeObj: 'q31Other',
                colunaNome: 'Q31_OTHER',
                isDate: false
            },
            {
                nomeObj: 'q32_1_1',
                colunaNome: 'Q32_1_1',
                isDate: false
            },
            {
                nomeObj: 'q32_2_1',
                colunaNome: 'Q32_2_1',
                isDate: false
            },
            {
                nomeObj: 'q33_1',
                colunaNome: 'Q33_1',
                isDate: false
            },
            {
                nomeObj: 'q33_2',
                colunaNome: 'Q33_2',
                isDate: false
            },
            {
                nomeObj: 'q33_3',
                colunaNome: 'Q33_3',
                isDate: false
            },
            {
                nomeObj: 'q33_4',
                colunaNome: 'Q33_4',
                isDate: false
            },
            {
                nomeObj: 'q33_5',
                colunaNome: 'Q33_5',
                isDate: false
            },
            {
                nomeObj: 'q33_6',
                colunaNome: 'Q33_6',
                isDate: false
            },
            {
                nomeObj: 'q33_7',
                colunaNome: 'Q33_7',
                isDate: false
            },
            {
                nomeObj: 'q33_8',
                colunaNome: 'Q33_8',
                isDate: false
            },
            {
                nomeObj: 'q33_9',
                colunaNome: 'Q33_9',
                isDate: false
            },
            {
                nomeObj: 'q33Exclusive',
                colunaNome: 'Q33_EXCLUSIVE',
                isDate: false
            },
            {
                nomeObj: 'q34',
                colunaNome: 'Q34',
                isDate: false
            },
            {
                nomeObj: 'q35',
                colunaNome: 'Q35',
                isDate: false
            },
            {
                nomeObj: 'q36',
                colunaNome: 'Q36',
                isDate: false
            },
            {
                nomeObj: 'q37',
                colunaNome: 'Q37',
                isDate: false
            },
            {
                nomeObj: 'q38',
                colunaNome: 'Q38',
                isDate: false
            },
            {
                nomeObj: 'q39',
                colunaNome: 'Q39',
                isDate: false
            },
            {
                nomeObj: 'q40',
                colunaNome: 'Q40',
                isDate: false
            },
            {
                nomeObj: 'q41',
                colunaNome: 'Q41',
                isDate: false
            },
            {
                nomeObj: 'q42',
                colunaNome: 'Q42',
                isDate: false
            },
        ]

        super(colunas, abaIndex, arquivo);
        this.usuarioId = usuarioId;
        this.log = new SocioAmbientalLog();
        this.baseLogText = null;
        this.listaSocioAmbiental = [];
        this.perguntas = []
    }

    isListaSocioAmbiental() {
        if (this.listaSocioAmbiental.length === 0) {
            throw new ErrorExecption('Lista de Socioambiental não pode ser vazio.');
        }
    }

    /**
     * @description Gera o objeto que pode passar pelas regras da importação
     * 
     * @returns
     */
    getListaSocioAmbiental() {
        if (this.listaSocioAmbiental.length > 0) {
            return this.listaSocioAmbiental
        } else {
            const data = this.geraObjetoParaImportar();
            const listaSocioAmbiental = [];
            for (let item of data) {
                let obj = this.getObjPorColuna(item);
                obj.linha = item['Linha'];
                listaSocioAmbiental.push(obj);
            }
            this.listaSocioAmbiental = listaSocioAmbiental;
            return this.listaSocioAmbiental;
        }
    }

    /**r
     * @description Valida a obrigatoriedade dos campos
     * 
     * @throws @throws ErrorExecption('Lista de Socioambiental não pode ser vazio.')
     */
    validaObrigatoriedade() {
        this.isListaSocioAmbiental();
        for (const item of this.listaSocioAmbiental) {
            let linha = item.linha;
            let codFornecedor = item.codFornecedor || '';

            this.baseLogText = this.log.baseMessageLog(linha);

            if (!codFornecedor) {
                this.setValidationErrors(this.log.campoObrigatorio('COD FORNECEDOR', this.baseLogText));
            }
        }
        this.exceptionHandling();
    }

    /**
    * @description Monta o objeto a ser inserido
    *
    * @returns array
    */
    getPayloadToSave() {
        this.isListaSocioAmbiental();
        let payload = [];

        this.listaSocioAmbiental.forEach(resposta => {
            const codFornecedor = resposta.codFornecedor
            // primeira pergunta
            payload = payload.concat(
                this.getObjPayload(codFornecedor, this.perguntas[0],
                    [
                        { name: 'q1', isFile: true, tipoFoto: TipoArquivoSocioAmbientalEnum.FAIXADA.value },
                        { name: 'q6', isFile: true, tipoFoto: TipoArquivoSocioAmbientalEnum.FAIXADA.value },
                        { name: 'q7', isFile: true, tipoFoto: TipoArquivoSocioAmbientalEnum.FAIXADA.value },
                        { name: 'q36', isFile: true, tipoFoto: TipoArquivoSocioAmbientalEnum.INTERNO.value },
                        { name: 'q37', isFile: true, tipoFoto: TipoArquivoSocioAmbientalEnum.INTERNO.value },
                        { name: 'q39', isFile: true, tipoFoto: TipoArquivoSocioAmbientalEnum.INTERNO.value },
                        { name: 'q38', isFile: true, tipoFoto: TipoArquivoSocioAmbientalEnum.INTERNO.value }
                    ], resposta)
            )

            // Segunda Pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[1],
                [
                    { name: 'q2', isFile: false },
                    { name: 'q2Exclusive', isFile: false },
                    { name: 'q2Other', isFile: false },
                ], resposta))

            // terceira pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[2],
                [
                    { name: 'q4_1' },
                    { name: 'q4_2' },
                    { name: 'q4_3' },
                    { name: 'q4_4' },
                    { name: 'q4_5' },
                    { name: 'q4_6' },
                    { name: 'q4_7' },
                    { name: 'q4_8' },
                    { name: 'q4Exclusive' },
                    { name: 'q4Type' },
                    { name: 'q4Other' }
                ], resposta))

            // quarta pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[3],
                [
                    { name: 'q8' },
                    { name: 'q8Exclusive' },
                    { name: 'q4Other' }
                ], resposta))

            // quinta pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[4],
                [
                    { name: 'q9' }
                ], resposta))

            // sexta pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[5],
                [
                    { name: 'q10' }
                ], resposta))

            // setima pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[6],
                [
                    { name: 'q11' }
                ], resposta))

            // oitava pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[7],
                [
                    { name: 'q12' }
                ], resposta))

            // nona pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[8],
                [
                    { name: 'q13' },
                    { name: 'q1Other' }
                ], resposta))

            // decima pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[9],
                [
                    { name: 'q14' }
                ], resposta))

            // decima primeira pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[10],
                [
                    { name: 'q15_1' },
                    { name: 'q15_2' },
                    { name: 'q15_3' },
                    { name: 'q15_4' },
                    { name: 'q15_5' },
                    { name: 'q15_6' },
                    { name: 'q15_7' },
                    { name: 'q15_8' },
                    { name: 'q15_9' },
                    { name: 'q15_19' },
                    { name: 'q15Type' },
                    { name: 'q15Other' }
                ], resposta))

            // decima segunda pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[11],
                [
                    { name: 'q16' }
                ], resposta))

            // decima terceira pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[12],
                [
                    { name: 'q17_1_1' },
                    { name: 'q17_2_1' },
                    { name: 'q17_3_1' }
                ], resposta))

            // decima quarta pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[13],
                [
                    { name: 'q18' }
                ], resposta))

            // decima quinta pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[14],
                [
                    { name: 'q19' }
                ], resposta))

            // decima sexta pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[15],
                [
                    { name: 'q20' }
                ], resposta))

            // decima setima pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[16],
                [
                    { name: 'q21' }
                ], resposta))

            // decima oitava pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[17],
                [
                    { name: 'q22_1' },
                    { name: 'q22_2' },
                    { name: 'q22_3' },
                    { name: 'q22_4' },
                    { name: 'q22_5' },
                    { name: 'q22_6' },
                    { name: 'q22_7' },
                    { name: 'q22_8' },
                    { name: 'q22_9' },
                    { name: 'q22_10' },
                    { name: 'q22_11' },
                    { name: 'q22_12' },
                    { name: 'q22Exclusive' }
                ], resposta))

            // decima nona pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[18],
                [
                    { name: 'q23' }
                ], resposta))

            // vigesima pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[19],
                [
                    { name: 'q24' }
                ], resposta))

            // vigesima primeira pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[20],
                [
                    { name: 'q25' }
                ], resposta))

            // vigesima segunda pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[21],
                [
                    { name: 'q26_1' },
                    { name: 'q26_2' },
                    { name: 'q26_3' },
                    { name: 'q26_4' },
                    { name: 'q26_5' },
                    { name: 'q26_6' },
                    { name: 'q26_7' },
                    { name: 'q26Exclusive' }
                ], resposta))

            // vigesima terceira pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[22],
                [
                    { name: 'q27' }
                ], resposta))

            // vigesima quarta pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[23],
                [
                    { name: 'q28_1' },
                    { name: 'q28_2' },
                    { name: 'q28_3' },
                    { name: 'q28_4' },
                    { name: 'q28_5' },
                    { name: 'q28Type' },
                    { name: 'q28Other' }
                ], resposta))

            // vigesima quinta pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[24],
                [
                    { name: 'q29_1' },
                    { name: 'q29_2' },
                    { name: 'q29_3' },
                    { name: 'q29_4' },
                    { name: 'q29Type' },
                    { name: 'q29Other' }
                ], resposta))

            // vigesima sexta pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[25],
                [
                    { name: 'q30' }
                ], resposta))

            // vigesima setima pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[26],
                [
                    { name: 'q31_1' },
                    { name: 'q31_2' },
                    { name: 'q31_3' },
                    { name: 'q31_4' },
                    { name: 'q31_5' },
                    { name: 'q31_6' },
                    { name: 'q31Type' },
                    { name: 'q31Other' }
                ], resposta))

            // vigesima oitava pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[27],
                [
                    { name: 'q32_1_1' },
                    { name: 'q32_2_1' }
                ], resposta))

            // vigesima nona pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[28],
                [
                    { name: 'q33_1' },
                    { name: 'q33_2' },
                    { name: 'q33_3' },
                    { name: 'q33_4' },
                    { name: 'q33_5' },
                    { name: 'q33_6' },
                    { name: 'q33_7' },
                    { name: 'q33_8' },
                    { name: 'q33_9' },
                    { name: 'q33Exclusive' }
                ], resposta))

            // trigesima pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[29],
                [
                    { name: 'q34' }
                ], resposta))

            // trigesima primeira pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[30],
                [
                    { name: 'q35' }
                ], resposta))

            // trigesima segunda pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[31],
                [
                    { name: 'q40' }
                ], resposta))

            // trigesima terceira pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[32],
                [
                    { name: 'q41' }
                ], resposta))

            // trigesima quarta pergunta
            payload = payload.concat(this.getObjPayload(codFornecedor, this.perguntas[33],
                [
                    { name: 'q42' }
                ], resposta))


        });

        return payload
    }

    getObjPayload(codFornecedor, pergunta, arrayColunas, data) {
        const obj = [];
        arrayColunas.forEach(coluna => {
            if (data[coluna.name]) {

                const dataHora = data.zeit.split(' ');

                const dataPesquisa = new Date(dateUtils.getDateFromString(dataHora[0], '/'))

                const objPayload = {
                    codigoPerguntasSocioAmbiental: pergunta.CodigoPerguntasSocioAmbiental,
                    codigoFornecedor: codFornecedor,
                    resposta: null,
                    arquivo: null,
                    tipoFoto: null,
                    dataPesquisa: dateUtils.getDateWithHours(dataPesquisa, dataHora[1], ':')
                }

                if (coluna.isFile) {
                    objPayload.arquivo = data[coluna.name];
                    objPayload.tipoFoto = coluna.tipoFoto;
                } else {
                    objPayload.resposta = data[coluna.name];
                }

                obj.push(objPayload)
            }
        });

        return obj;
    }
}