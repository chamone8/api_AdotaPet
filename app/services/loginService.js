const { send } = require("process")

module.exports = class loginService {
    async postLogin(req,res){
        res.send('teste')
    }
}