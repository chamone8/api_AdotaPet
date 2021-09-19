const Response = require('../helpers/httpResponse');
const HttpStatusCode = require('../helpers/httpStatusCode');
const CommonService = require('./commonService');
const PetsBO = require('../domain/business/petsBo');


class petService extends CommonService{
    async savePets(req, res) {
        try {
            let payload = req.body;
            const petsBO = new PetsBO();
            let result = await petsBO.savePets(payload);
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