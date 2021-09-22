const { serve } = require('swagger-ui-express');
const ArquivoService = require('../services/ArquivoService');

module.exports.postArquivo = function(req, res){
    const service = new ArquivoService()
    service.saveArquivo(req, res);
}
module.exports.getArquivo = function(req, res){
    const service = new ArquivoService()
    service.getArquivo(req, res);
}
