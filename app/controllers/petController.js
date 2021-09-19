const { serve } = require('swagger-ui-express');
const petService = require('../services/petService');

module.exports.postPets = function(req, res){
    const service = new petService()
    service.savePets(req, res);
}
module.exports.getPets = function(req, res){
    const service = new petService()
    service.getPets(req, res);
}
