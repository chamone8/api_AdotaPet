'use strict';

module.exports.responseAPI = {
    success: async function (res, data, statusCode) {
        res.status(statusCode).send({ data: data });
    },
    error: async function (res, statusCode, errorMsg, Known_error = false) {
        if (Known_error) {
            res.status(statusCode).send({ message: errorMsg });
        } else {
            try {
                // Gravar log no banco
                res.status(statusCode).send({ message: errorMsg });
            } catch (err) {
                res.status(statusCode).send({ message: errorMsg })
            }
        }
    }
}