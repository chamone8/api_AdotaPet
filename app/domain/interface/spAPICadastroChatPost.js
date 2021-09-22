'use strict';

class SpAPICadastroPetPost {
    constructor() {
            this.nome = null,
            this.texto = null,
            this.inseridoPor = null,
            this.status = null
    }

        setParameter(obj) {
        if (typeof obj.nome !== 'undefined' && typeof obj.nome === 'string') {
            this.nome = obj.nome;
        }
        if (typeof obj.texto !== 'undefined' && typeof obj.texto === 'string') {
            this.texto = obj.texto;
        }
        if (typeof obj.inseridoPor !== 'undefined' && typeof obj.inseridoPor === 'number') {
            this.inseridoPor = obj.inseridoPor;
        }
        if (typeof obj.status !== 'undefined' && typeof obj.status === 'boolean') {
            this.status = obj.status;
        }
    }
}

module.exports = SpAPICadastroPetPost;