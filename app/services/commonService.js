'use strict';
const Response = require('../helpers/httpResponse');
const HttpStatusCode = require('../helpers/httpStatusCode');
const {
    ErrorExecption,
    BadRequestException
} = require('../helpers/exception');
// const ConflictException = require('./exception/conflictException');
// const NotFoundException = require('./exception/notFoundException');
// const AuthenticationException = require('./domain/exception/authenticationException');
// const log = require('../../log').tracer;

class CommonService {
    constructor(contextBO) {
        this._contextBO = contextBO;
        this._response = Response;
        this._httpStatusCode = HttpStatusCode;
    }

    errorHandle(err, res, isFile) {
        console.log(`[METODO] ${res.req.swagger.operation.operationId} - [URL] ${res.req._parsedUrl.href} - [PARAMETROS] ${JSON.stringify(res.req.body)} - [MENSAGEM ERRO] ${err.message}\n`);
        if (err instanceof BadRequestException) {
            if (isFile) {
                res.status(HttpStatusCode.BAD_REQUEST).send({
                    message: "Erro na validação dos dados do arquivo.",
                    log: err.data
                })
            } else {
                Response.responseAPI.error(res, HttpStatusCode.BAD_REQUEST, err.message, true);
            }
        }
        if (err instanceof BadRequestException) {
            Response.responseAPI.error(res, HttpStatusCode.BAD_REQUEST, err.message, true);
        } else if (err instanceof ErrorExecption) {
            Response.responseAPI.error(res, HttpStatusCode.UNPROCESSABLE_ENTITY, err.message, true);
        } else if (err) {
            Response.responseAPI.error(res, HttpStatusCode.CONFLICT, err.message, true);
        } else if (err instanceof NotFoundException) {
            Response.responseAPI.error(res, HttpStatusCode.NOT_FOUND, err.message, true);
        } else if (err instanceof AuthenticationException) {
            Response.responseAPI.error(res, HttpStatusCode.UNAUTHORIZED, err.message);
        } else {
            Response.responseAPI.error(res, HttpStatusCode.INTERNAL_SERVER_ERROR, err.message);
        }
    }

    async find(req, res) {
        try {
            let params = req.swagger.params;
            let result = await this._contextBO.find(params);
            if (result.results === null) {
                result.results = [];
            }
            Response.responseAPI.success(res, result, HttpStatusCode.OK);
        } catch (err) {
            this.errorHandle(err, res);
        }
    }

    async findAll(req, res) {
        try {
            let result = await this._contextBO.findAll();
            if (result.results === null) {
                result.results = [];
            }
            Response.responseAPI.success(res, result, HttpStatusCode.OK);
        } catch (err) {
            this.errorHandle(err, res);
        }
    }

    async findById(req, res) {
        try {
            let id = req.swagger.params.id.value;
            let result = await this._contextBO.findById(id);
            if (result === null) {
                result = {};
            }
            Response.responseAPI.success(res, result, HttpStatusCode.OK);
        } catch (err) {
            this.errorHandle(err, res);
        }
    }

    async save(req, res) {
        try {
            let result = await this._contextBO.save(req.body);
            Response.responseAPI.success(res, result, HttpStatusCode.CREATED);
        } catch (err) {
            this.errorHandle(err, res);
        }
    }

    async update(req, res) {
        try {
            let id = req.swagger.params.id.value;
            let body = req.body;
            let result = await this._contextBO.update(id, body);
            Response.responseAPI.success(res, result, HttpStatusCode.OK);
        } catch (err) {
            this.errorHandle(err, res);
        }
    }

    async patch(req, res) {
        try {
            let id = req.swagger.params.id.value;
            let body = req.body;
            let result = await this._contextBO.patch(id, body);
            Response.responseAPI.success(res, result, HttpStatusCode.OK);
        } catch (err) {
            this.errorHandle(err, res);
        }
    }

    async remove(req, res) {
        try {
            let id = req.swagger.params.id.value;
            let result = await this._contextBO.remove(id);
            Response.responseAPI.success(res, result, HttpStatusCode.OK);
        } catch (err) {
            this.errorHandle(err, res);
        }
    }

    /**
     * Função generica para retorno torno de procedures
     * 
     * @param {Request} req 
     * @param {Response} res
     * @param {String} functionRepository Nome da função na classe repository
     * @param {Class} classResponse Classe que tranforma retorno da procedure em objeto    
     * @returns {[JSON, null]} se houver resultado retorna o json
     */
    async getGeneric(req, res, functionRepository, classResponse) {
        try {
            let params = req.swagger.params;
            let response = await this._contextBO.getGeneric(params, functionRepository, classResponse);
            Response.responseAPI.success(res, response, HttpStatusCode.OK);
        } catch (err) {
            this.errorHandle(err, res);
        }
    }
}

module.exports = CommonService;