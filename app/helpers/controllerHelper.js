'use strict';
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const HttpStatusCode = require('./httpStatusCode');
const ErroException = require('../exception/httpErroException');
const ConflictException = require('../exception/conflictException');
// const Error = require('../exception/Error')


async function voidReturn(res, promise) {
    promise.then(()=>{
        res.status(HttpStatusCode.OK).send();
    })
    .catch((err)=> {
        errorHandler(err, res);
    });
}


async function list(res, data, statusCode) {
    try {
        const synch = await data;
        one(res, { data: synch, totalElements : Math.round(synch._total)}, statusCode);
    } catch(err) {
        errorHandler(err, res);
    }
}

async function one(res, data, statusCode) {
    try {
        if (!statusCode) {
            statusCode = HttpStatusCode.OK;
        }
        const synch = await data;
        res.status(statusCode).send(synch);
    } catch(err) {
        errorHandler(err, res);
    }
}

async function sendErrorResponse(res, statusCode, errorMsg, code) {
    if(code) {
        res.status(statusCode).send({ code : code, message: errorMsg });
    } else {
        try {
            res.status(statusCode).send({ message: errorMsg });
        } catch (err) {
            res.status(statusCode).send({ message: errorMsg })
        }
    }
}


function extractRequestParams(req) {
    const params = {};
    _.mapKeys(req.swagger.params, (valueWrapper, key) => {
        params[key]= valueWrapper.value;
    });
    return params;
}


function extractFromPath(req,name) {
    
    const param = req.swagger.params[name];
    if (!param) {
        throw new Error(`Path param not found ${name}`);
    }
    return param.value;
}


function extractContext(req,name) {
    const user = req.swagger.params['From'];
    const userId = req.swagger.params['usuarioId'];
    const token = req.swagger.params['access_token'];
    return {
        user : user ? user.value : null,
        token : token? token.value : null,
        usuarioId : userId? userId.value : null
    };
}

function extractContextFromToken(req, dominio) {
    try {
        const token = req.swagger.params['Authorization'];
        if (!token.value.startsWith('Bearer ')) {
            throw new Error('no token bearer');
        }
        const tokenData = jwt.decode(token.value.slice(7,token.value.length));
        const authDetails = tokenData.domain[dominio];
        return {
            user : authDetails ? authDetails.username : null,
            token : token? token.value : null,
            authDetails,
            dominio
        };
    } catch(err) {
        throw new Error(err.message);
    }
}
 
const errorHandler = (err, res) => {
    if (err instanceof ErroException) {
        sendErrorResponse(res, HttpStatusCode.UNPROCESSABLE_ENTITY, err.message);
    }
    else if (err instanceof ConflictException) {
        sendErrorResponse(res, HttpStatusCode.CONFLICT, err.message, 'UN-E010');
    }
    else {
        sendErrorResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, err.message);
    }
}

class ControllerFactory {

    getDefaultErrorHandler(){
        return errorHandler;
    }

    searchWith(service) {
        return function (req, res) {            
            const result = service.find(extractRequestParams(req), extractContext(req));
            list(res, result);
        };
    }


    saveWith(service) {
        return function (req, res) {            
            const result = service.save(req.body, extractContext(req));
            one(res, result);
        };
    }

    patchWith(service) {
        return function (req, res) {            
            const result = service.patch(req.body, extractContext(req));
            one(res, result);
        };
    }


    findByIdWith(service) {
        return function (req, res) {
            const params = extractRequestParams(req);
            if (!params.id) {
                throw new Error('Must define a id ');
            }
            const result = service.findById(params.id, extractContext(req));
            one(res, result); 
        };
    }

    executeOne(func) {
        return function (req, res) {
            const result = func(req,res);
            return one(res, result);
        };
    }
    executeList(func) {
        return function (req, res) {
            const result = func(req, res);
            return list(res, result);
        };
    }
    executeVoid(func) {
        return function (req, res) {
            const result = func(req, res);
            return voidReturn(res, result);
        };
    }
}

const controllerFactory = new ControllerFactory();
module.exports.controllerFactory = controllerFactory;

module.exports.responseAPI = {
    list,
    one,
    error: sendErrorResponse,
    voidPromise : voidReturn
}

module.exports.requestAPI = {
    params : extractRequestParams,
    path : extractFromPath,
    context : extractContext,
    contextFromToken : extractContextFromToken
}