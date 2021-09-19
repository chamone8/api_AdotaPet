'use strict';
// const CommomBO = require('./commonBO');
const SpAPICadastroChatPost =require('../interface/spAPICadastroChatPost');
const ChatRepository = require('../repository/ChatRepository');
const PostResponseDTO = require('../dto/postResponseDTO');

class PetsBO  {
    constructor() {
        
    }

    async saveChat(payload) {
        let procedure = new SpAPICadastroChatPost();
        const repository = new ChatRepository();
        
        procedure.setParameter(payload);
        
        await repository.saveChat(procedure);

        return PostResponseDTO.dto('dados Inserido com sucesso!!!');
    }
    async findChat(id) {
        console.log(id)
        const repository = new ChatRepository();
        let result = await repository.findChat(id);

        return PostResponseDTO.dto(result);
    }
}

module.exports = PetsBO;