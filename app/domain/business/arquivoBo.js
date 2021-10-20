'use strict';
// const CommomBO = require('./commonBO');
// const SpAPISaveArquivotPost =require('../interface/spAPIArquivotPost');
const arquivoRepository = require('../repository/ArquivoRepository');
const PostResponseDTO = require('../dto/postResponseDTO');

class PetsBO  {
    constructor() {
        
    }

    async saveArquivo(base64,dadosDono,dadosPet) {
        try {
            // let procedure = new SpAPICadastroChatPost();
            const repository = new arquivoRepository();
            
            // procedure.setParameter(payload);
            
            let result  = await repository.saveArquivo({buffer: base64},dadosDono,dadosPet);
    
            return result;//PostResponseDTO.dto('dados Inserido com sucesso!!!');    
        } catch (error) {
            console.log(error)
        }
        
    }
    async findArquivo() {
        const repository = new arquivoRepository();
        let result = await repository.findArquivo();

        return result
    }
}

module.exports = PetsBO;