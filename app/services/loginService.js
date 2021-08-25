const Response = require('../helpers/httpResponse');
const HttpStatusCode = require('../helpers/httpStatusCode');
const envConfig = require('config');
const httpAxios = require('axios');
const _BASE_URL_ACESSO = `${envConfig.get('API_ACESSO').BASE_URL}`;


module.exports = class loginService {
    async postLogin(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        if (!(username && password)) {
            console.log('não tem senha')
        }
        try {
            let response = await httpAxios({
                method: 'POST',
                baseURL: _BASE_URL_ACESSO,
                url: '/login',
                data: {
                    username: username,
                    password: password
                }
            });
            Response.responseAPI.success(res, response.data, HttpStatusCode.OK)
        } catch (err) {
            // throw new Error(`Erro no exception`); 
            console.log(err)
        }
    }

    async postCadastro(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        const password2 = req.body.password2;
        const email = req.body.email;
        // if (!(username && password)) {
        //     throw new Error(`usuario ou senha incorretos`);
        // }
        if (password !== password2) {
            throw new Error(`Senhas são diferentes`);
        }
        try {
            let response = await httpAxios({
                method: 'POST',
                baseURL: _BASE_URL_ACESSO,
                url: '/users',
                data: {
                    username: username,
                    password: password,
                    password2: password2,
                    email: email
                }
            });
            Response.responseAPI.success(res, response.data, HttpStatusCode.OK)
        } catch (err) {
            // throw new Error(`Erro no exception`); 
            console.log(err)
        }
    }





    async _token() {
        // let token = null;
        // if (token === null) {
        //     token = ;
        // }
        return (await this.login()).tokenacesso;
    }

}