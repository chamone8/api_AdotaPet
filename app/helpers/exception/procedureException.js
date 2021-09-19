'use strict';

class ProcedureException {
    /** Construtor */
  constructor(procedureName, error){ 
    this.message = `sp: ${procedureName} mensagem: ${error}`;
  } 
}

module.exports = ProcedureException;