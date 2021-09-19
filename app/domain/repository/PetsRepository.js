const mongoose = require('mongoose');
const modelPets = mongoose.model('Pets');



class PetsRepository {

    async savePets(filter) {
        try {
            let results = new modelPets({
                idDono: filter.idDono,
                nomePet: filter.nomePet,
                nomeDono: filter.nomeDono,
                idadePet: filter.idadePet,
                racaPet: filter.racaPet,
                estado: filter.estado,
                bairro: filter.bairro,
                endereco: filter.endereco,
                cidade: filter.cidade,
                inseridoPor: filter.inseridoPor,
                possuiRg: filter.possuiRg,
                vacinas: filter.vacinas,
                doencas: filter.doencas,
                informacoesAdicionais: filter.informacoesAdicionais
            });

            results.save()
                .then(() => console.log({ sucess: true, statuscode: 200, message: 'Cadastro efetuado com sucesso' }))
                .catch(err => console.log({ sucess: false, statuscode: 500, message: 'Cadastro não Efetuado, entre em contado com o suporte ' + err }))

        } catch (error) {
            console.log(error)
        }
    }
    async findPets(req, res) {
        try {
          let result = await  modelPets.find()

          return result;
        } catch (error) {
            console.log(error)

        }
    }
}

module.exports = PetsRepository;