'use strict';
// const CommomBO = require('./commonBO');
const SpAPICadastroChatPost =require('../interface/spAPICadastroChatPost');
const ChatRepository = require('../repository/ChatRepository');
const PostResponseDTO = require('../dto/postResponseDTO');

class PetsBO  {
    constructor() {
        
    }

    async saveChat(payload) {
        try {
            let procedure = new SpAPICadastroChatPost();
            const repository = new ChatRepository();
            
            procedure.setParameter(payload);
            
            let result  = await repository.saveChat(procedure);
    
            return result;//PostResponseDTO.dto('dados Inserido com sucesso!!!');    
        } catch (error) {
            console.log(error)
        }
        
    }
    async findChat(id) {
        const repository = new ChatRepository();
        let result = await repository.findChat(id);

        return PostResponseDTO.dto(result);
    }
}

module.exports = PetsBO;