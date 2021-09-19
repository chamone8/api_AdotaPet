const mongoose = require('mongoose');
require('../../model/chatModel');
const modelChat = mongoose.model('Chat');




class ChatRepository {

    async saveChat(filter) {
        try {
            let results = new modelChat({
                nome: filter.nome,
                texto: filter.texto,
                inseridoPor: filter.inseridoPor,
                status: filter.status

            });

            results.save()
                .then(() => console.log({ sucess: true, statuscode: 200, message: 'Cadastro efetuado com sucesso' }))
                .catch(err => console.log({ sucess: false, statuscode: 500, message: 'Cadastro não Efetuado, entre em contado com o suporte ' + err }))

        } catch (error) {
            console.log(error)
        }
    }
    async findChat(req, res) {
        try {
          let result = await  modelChat.find()

          return result;
        } catch (error) {
            console.log(error)

        }
    }
}

module.exports = ChatRepository;