const loginService = require('../services/loginService.js')
module.exports.postLogin = function(req, res){
    const service = new loginService()
    service.postLogin(req, res);
}