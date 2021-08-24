
const express  = require('express');
const routes = express.Router();
const LoginController = require('./controllers/loginController')

routes.get('/', LoginController.postLogin);


module.exports = routes;