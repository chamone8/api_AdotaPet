const Response = require('../helpers/httpResponse');
const HttpStatusCode = require('../helpers/httpStatusCode');
const CommonService = require('./commonService');
const ChatBO = require('../domain/business/ChatBO');
const fs = require('fs')



class petService extends CommonService{
    async saveArquivo(req, res) {
        try {
            const imageAsBase64 = fs.readFileSync(req.file.buffer.toString('base64'));
            console.log(imageAsBase64);
            return new Buffer(imageAsBase64).toString('base64');

            // const chatBO = new ChatBO();
            // let result = await chatBO.saveArquivo(payload);
            // Response.responseAPI.success(res, result, HttpStatusCode.CREATED);
        } catch (err) {
            this.errorHandle(err, res);
        }
    }
    async getArquivo(req, res) {
        try {
            let payload = req.query.id;
            const chatBO = new ChatBO();
            let result = await chatBO.findArquivo(payload);
            Response.responseAPI.success(res, result, HttpStatusCode.CREATED);
        } catch (err) {
            this.errorHandle(err, res);
        }
    }
}

module.exports = petService;