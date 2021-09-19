const StringUtils = require("../../domain/utils/string");

'use strict';

class ConflictException {
    /** Construtor */
  constructor(message){ 
    this.message = message || StringUtils.error_exception_message_default;
  } 
}

module.exports = ConflictException;