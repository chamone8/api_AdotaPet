'use strict';

// Objeto de response da api de inclusão de recursos.
module.exports = {
    dto: (value) => {
        return {
            insertId: value
        }
    }
};