const mongoose = require('mongoose');
require('../../model/arquivoModel');
const modelArquivo = mongoose.model('Arquivo');




class ChatRepository {

    async saveArquivo(filter,id, idpet) {
        let idDono = null
        if(id !== null){
            idDono = id._id;
        }
        try {
            let results = new modelArquivo({
                base64: filter.buffer,
                idPet: idpet,
                Iddono: idDono

            });

            await results.save()
                .then(() => console.log({ sucess: true, statuscode: 200, message: 'Cadastro efetuado com sucesso' }))
                .catch(err => console.log({ sucess: false, statuscode: 500, message: 'Erro no metodo saveArquivo,  ' + err }))
            return results;

        } catch (error) {
            console.log(error)
        }
    }
    async findArquivo(){
        try {
            let result = await  modelArquivo.find()
            return result;
          } catch (error) {
              console.log(error)
  
          }
    }
}

module.exports = ChatRepository;