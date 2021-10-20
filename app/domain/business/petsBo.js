'use strict';
// const CommomBO = require('./commonBO');
const SpAPICadastroPetPost =require('../interface/spAPICadastroPetPost');
const PetsRepository = require('../repository/PetsRepository');
const PostResponseDTO = require('../dto/postResponseDTO');


class PetsBO  {
    constructor() {
    }

    async savePets(payload) {
        let procedure = new SpAPICadastroPetPost();
        // procedure.setParameter(payload);
        const repository = new PetsRepository();
       let results = await repository.savePets(payload);

        return results;
    }
    async findPets(id) {
        console.log(id)
        const repository = new PetsRepository();
        let result = await repository.findPets(id);

        return PostResponseDTO.dto(result);
    }
}

module.exports = PetsBO;