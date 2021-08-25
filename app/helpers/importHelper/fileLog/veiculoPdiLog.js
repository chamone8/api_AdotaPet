'use strict';
const BaseLog = require('./baseLog')

module.exports = class VeiculoPdiLog extends BaseLog{
    
    /**
     *
     *
     * @param {*} linha
     * @param {*} chassi
     * @param {*} modelo
     * @param {*} cor
     * @param {*} dataEntrada
     * @param {*} vaga
     * @returns
     */
    baseMessageLog(linha, chassi, modelo, cor, dataEntrada, vaga) {
        return `Linha ${linha} - Chassi ${chassi} - Modelo ${modelo} - Cor ${cor} - Data Entrada - ${dataEntrada} - Vaga: ${vaga} -`
    }

    chassiFormat(baseMessage) {
        return `${baseMessage} Chassi está em formato inválido para importação. Use uma máscara de 17 caracteres, com letras e números.`;
    }

    chassiNaoEncontradoBaseDeDados(baseMessageLog) {
        return `${baseMessageLog} Veículo não encontrado.`;
    }

    chassiDuplicado(baseMessageLog) {
        return `${baseMessageLog} Chassi já citado anteriormente neste arquivo.`;
    }

    existenciaDadosCadastro(baseMessageLog) {
        return `${baseMessageLog} Os dados Data Entrada ou Vaga não foram informados.`;
    }

    formatacaoDataEntrada(baseMessageLog) {
        return `${baseMessageLog} Data Entrada está em formato inválido para importação. [dd/mm/yyyy].`;
    }

    consistenciaDadoDataPrevisao(baseMessageLog) {
        return `${baseMessageLog} A Data informada é inválida`;
    }

    dadosExistente(baseMessageLog) {
        return `${baseMessageLog} Este veículo já possui saída registrada no sistema. Não é possível editar novamente esse registro.`;
    }

    campoObrigatorio(baseMessage, fieldTitle) {
        return `${baseMessage} ${fieldTitle || ''} não informado.`;
    }

    dataNoFuturo(baseMessageLog) {
        return `${baseMessageLog} A data de entrada pátio deve ser igual a data de hoje.`;
    }

    dataAcessorioNoFuturo(baseMessageLog) {
        return `${baseMessageLog} A data de conclusão de acessório deve ser igual a data de hoje.`;
    }

    dataRetroativa(baseMessageLog) {
        return `${baseMessageLog} A data de entrada pátio deve ser igual a data de hoje.`;
    }

    dataPdiRetroativa(baseMessageLog) {
        return `${baseMessageLog} A Data PDI Inspeção não pode ser maior que a data de hoje.`;
    }

    dataPdiMenorConclusao(baseMessageLog) {
        return `${baseMessageLog} A Data PDI Inspeção não pode ser menor que a Conclusão Acessórios.`;
    }

    dateFormat(fieldTitle, baseMessage) {
        return `${baseMessage} ${fieldTitle} está em formato inválido para importação. Use o formato [dd/mm/aaaa].`;
    }
}