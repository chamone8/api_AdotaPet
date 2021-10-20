const Response = require('../helpers/httpResponse');
const HttpStatusCode = require('../helpers/httpStatusCode');
const CommonService = require('./commonService');
const PetsBO = require('../domain/business/petsBo');
const ArquivoService = require('./ArquivoService');

class petService extends CommonService{
    async savePets(req, res) {
        try {
            let payload = req.body;
            let arquivo = req.body.file;
            let idUsuario = req.body.idDono;
            const petsBO = new PetsBO();
            const arquivoService = new ArquivoService()
            let result = await petsBO.savePets(payload);
            if(result){
                console.log(result)
            }
            await arquivoService.saveArquivoPet(arquivo, idUsuario)
            Response.responseAPI.success(res, result, HttpStatusCode.CREATED);
        } catch (err) {
            this.errorHandle(err, res);
        }
    }
    async getPets(req, res) {
        try {
            let payload = req.query.id;
            const petsBO = new PetsBO();
            let result = await petsBO.findPets(payload);
            Response.responseAPI.success(res, result, HttpStatusCode.CREATED);
        } catch (err) {
            this.errorHandle(err, res);
        }
    }
}

module.exports = petService;