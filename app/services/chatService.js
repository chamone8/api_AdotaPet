const Response = require('../helpers/httpResponse');
const HttpStatusCode = require('../helpers/httpStatusCode');
const CommonService = require('./commonService');
const ChatBO = require('../domain/business/ChatBO');


class petService extends CommonService{
    async savechat(req, res) {
        try {
            let payload = req.body;
            const chatBO = new ChatBO();
            let result = await chatBO.saveChat(payload);
            Response.responseAPI.success(res, result, HttpStatusCode.CREATED);
        } catch (err) {
            this.errorHandle(err, res);
        }
    }
    async getchat(req, res) {
        try {
            let payload = req.query.id;
            const chatBO = new ChatBO();
            let result = await chatBO.findChat(payload);
            Response.responseAPI.success(res, result, HttpStatusCode.CREATED);
        } catch (err) {
            this.errorHandle(err, res);
        }
    }
}

module.exports = petService;