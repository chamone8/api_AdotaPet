const Response = require("../helpers/httpResponse");
const HttpStatusCode = require("../helpers/httpStatusCode");
const envConfig = require("config");
const httpAxios = require("axios");
const _BASE_URL_ACESSO = `${envConfig.get("API_ACESSO").BASE_URL}`;
const ArquivoService = require("../services/ArquivoService");


module.exports = class loginService {
  async postLogin(req, res) {
    const username = req.body.email;
    const password = req.body.password;
    if (!(username && password)) {
      console.log("não tem senha");
    }
    try {
      let response = await httpAxios({
        method: "POST",
        baseURL: _BASE_URL_ACESSO,
        url: "/login",
        data: {
          username: username,
          password: password,
        },
      });
      Response.responseAPI.success(res, response.data, HttpStatusCode.OK);
    } catch (err) {
      // throw new Error(`Erro no exception`);
      console.log(err);
    }
  }

  async postCadastro(req, res) {
    const dados = req.body;
    const username = dados.nomeCompleto;
    const password = dados.password;
    const arquivoService = new ArquivoService();

    // if (!(username && password)) {
    //     throw new Error(`usuario ou senha incorretos`);
    // }
    if (dados.password !== dados.confirmarPassword) {
      throw new Error(`Senhas são diferentes`);
    }
    if (dados.email !== dados.confirmarEmail) {
      throw new Error(`Emails são diferentes`);
    }
    try {
      let response = await httpAxios({
        method: "POST",
        baseURL: _BASE_URL_ACESSO,
        url: "/users",
        data: {
          username: dados.nomeCompleto,
          password: dados.password,
          password2: dados.confirmarPassword,
          email: dados.email,
          bairro: dados.bairro,
          cidade: dados.cidade,
          endereco: dados.endereco,
          estado: dados.estado,
        },
      });

      if (response.data.status === 200) {
        await httpAxios({
          method: "POST",
          baseURL: _BASE_URL_ACESSO,
          url: "/id/user",
          data: {
            username: username,
            password: password,
          },
        }).then((resultApi) =>
          arquivoService.saveArquivoLogin(req, resultApi.data)
        );
      }
      Response.responseAPI.success(res, response.data, HttpStatusCode.OK);
    } catch (err) {
      throw new Error({ sucess: false, status: 400, message: err });
    }
  }

  async _token() {
    // let token = null;
    // if (token === null) {
    //     token = ;
    // }
    return (await this.login()).tokenacesso;
  }
};
