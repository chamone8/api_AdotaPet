'use strict';

class BadRequestException {
    constructor(message) {
        this.message = message;
    }
}

module.exports = BadRequestException;