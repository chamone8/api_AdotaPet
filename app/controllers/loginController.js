const loginService = require('../services/loginService.js')
module.exports.postLogin = function(req, res){
    const service = new loginService()
    service.postLogin(req, res);
}
module.exports.postCadastro = function(req, res){
    const service = new loginService()
    service.postCadastro(req, res);
}