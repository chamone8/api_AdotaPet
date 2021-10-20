const Response = require("../helpers/httpResponse");
const HttpStatusCode = require("../helpers/httpStatusCode");
const CommonService = require("./commonService");
const ArquivoChat = require("../domain/business/arquivoBo");
const multer = require("multer");
const upload = multer({ dest: "arquivo/" });
const fs = require("fs");
const mime = require("mime");

class ArquivoService extends CommonService {
  async saveArquivo(req, res) {
    try {
      const arquivoChat = new ArquivoChat();
      let buff = new Buffer(req.file.buffer).toString("base64");

      let result = await arquivoChat.saveArquivo(buff);
      Response.responseAPI.success(res, result, HttpStatusCode.CREATED);
    } catch (err) {
      console.log(err);
    }
  }
  async saveArquivoLogin(file, dados) {
    try {
      const arquivoChat = new ArquivoChat();
      let buff = new Buffer(file).toString("base64");

      let result = await arquivoChat.saveArquivo(buff, dados, null);
      Response.responseAPI.success(res, result, HttpStatusCode.CREATED);
    } catch (err) {
      console.log(err);
    }
  }
  async saveArquivoPet(file, dados) {
    try {
      const arquivoChat = new ArquivoChat();
      let buff = new Buffer(file).toString("base64");

      let result = await arquivoChat.saveArquivo(buff, null, dados);
      Response.responseAPI.success(res, result, HttpStatusCode.CREATED);
    } catch (err) {
      console.log(err);
    }
  }
  async getArquivo(req, res) {
    try {
      let payload = req.body;
      const arquivoChat = new ArquivoChat();
      let result = await arquivoChat.findArquivo(payload);

      const base64 = result.insertId.res.toString("base64");
      let base64Ut = "data:application/pdf;base64," + base64;

      Response.responseAPI.success(res, base64Ut, HttpStatusCode.CREATED);
    } catch (err) {
      this.errorHandle(err, res);
    }
  }
}

module.exports = ArquivoService;
