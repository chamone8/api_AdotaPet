const { serve } = require('swagger-ui-express');
const chatService = require('../services/chatService');

module.exports.postchat = function(req, res){
    const service = new chatService()
    service.savechat(req, res);
}
module.exports.getchat = function(req, res){
    const service = new chatService()
    service.getchat(req, res);
}
