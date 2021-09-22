
const express  = require('express');
const routes = express.Router();
const multer = require('multer');

const PetController = require('./controllers/petController');
const ChatController = require('./controllers/ChatController');
const LoginController = require('./controllers/loginController');
const ArquivoController = require('./controllers/arquivoControler');


const multerConfig = require('./config/multerConfig');
const upload = multer({dest: "/arquivo/file"})

routes.post('/login', LoginController.postLogin);
routes.get('/teste', LoginController.postLogin);

routes.post('/chat', ChatController.postchat);
routes.get('/chat', ChatController.getchat);

routes.post('/pet', PetController.postPets);
routes.get('/pet', PetController.getPets);

routes.post('/arquivo/file', upload.single('file') ,ArquivoController.postArquivo);
routes.get('/arquivo', ArquivoController.getArquivo);

module.exports = routes;