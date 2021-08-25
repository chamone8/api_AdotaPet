
const express  = require('express');
const routes = express.Router();
const LoginController = require('./controllers/loginController')

routes.post('/login', LoginController.postLogin);
routes.get('/teste', LoginController.postLogin);

// "x-swagger-router-controller": "loginController",
module.exports = routes;