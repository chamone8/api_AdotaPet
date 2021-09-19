'use strict';

class SpAPICadastroPetPost {
    constructor() {
            this.nome = null,
            this.texto = null,
            this.inseridoPor = null,
            this.status = null,
            this.bairro = null,
            this.Aberto = null,
            this.bairro = null,
            this.endereco = null,
            this.cidade = null,
            this.inseridoEm = null,
            this.inseridoPor = null,
            this.possuiRg = null,
            this.vacinas = null,
            this.doencas = null,
            this.informacoesAdicionais = null
    }

        setParameter(obj) {
        if (typeof obj.nomePet !== 'undefined' && typeof obj.nomePet === 'string') {
            this.nomePet = obj.nomePet;
        }
        if (typeof obj.idDono !== 'undefined' && typeof obj.idDono === 'number') {
            this.idDono = obj.idDono;
        }
        if (typeof obj.nomeDono !== 'undefined' && typeof obj.nomeDono === 'string') {
            this.nomeDono = obj.nomeDono;
        }
        if (typeof obj.idadePet !== 'undefined' && typeof obj.idadePet === 'number') {
            this.idadePet = obj.idadePet;
        }
        if (typeof obj.racaPet !== 'undefined' && typeof obj.racaPet === 'string') {
            this.racaPet = obj.racaPet;
        }
        if (typeof obj.estado !== 'undefined' && typeof obj.estado === 'string') {
            this.estado = obj.estado;
        }
        if (typeof obj.bairro !== 'undefined' && typeof obj.bairro === 'string') {
            this.bairro = obj.bairro;
        }
        if (typeof obj.endereco !== 'undefined' && typeof obj.endereco === 'string') {
            this.endereco = obj.endereco;
        }
        if (typeof obj.cidade !== 'undefined' && typeof obj.cidade === 'string') {
            this.cidade = obj.cidade;
        }
        if (typeof obj.inseridoEm !== 'undefined' && typeof obj.inseridoEm === 'string') {
            this.inseridoEm = obj.inseridoEm;
        }
        if (typeof obj.inseridoPor !== 'undefined' && typeof obj.inseridoPor === 'number') {
            this.inseridoPor = obj.inseridoPor;
        }
        if (typeof obj.possuiRg !== 'undefined' && typeof obj.possuiRg === 'boolean') {
            this.possuiRg = obj.possuiRg;
        }
        if (typeof obj.vacinas !== 'undefined' && typeof obj.vacinas === 'string') {
            this.vacinas = obj.vacinas;
        }
        if (typeof obj.doencas !== 'undefined' && typeof obj.doencas === 'string') {
            this.doencas = obj.doencas;
        }
        if (typeof obj.infomacoesAdicionais !== 'undefined' && typeof obj.infomacoesAdicionais === 'string') {
            this.informacoesAdicionais = obj.infomacoesAdicionais;
        }
    }
}

module.exports = SpAPICadastroPetPost;