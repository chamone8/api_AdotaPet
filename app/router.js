
const express  = require('express');
const routes = express.Router();
const multer = require('multer');

const PetController = require('./controllers/petController');
const ChatController = require('./controllers/ChatController');
const LoginController = require('./controllers/loginController');
const ArquivoController = require('./controllers/arquivoControler');
const storage = multer.memoryStorage()


// const multerConfig = require('./config/multerConfig');
const upload = multer({storage: storage, dest: '/arquivo/'})

routes.post('/login',upload.single('file') , LoginController.postLogin);
routes.post('/usuario/cadastro', LoginController.postCadastro);

routes.post('/chat', ChatController.postchat);
routes.get('/chat', ChatController.getchat);

routes.post('/pet',upload.single('file') , PetController.postPets);
routes.get('/pet', PetController.getPets);

routes.post('/arquivo/file', upload.single('file') ,ArquivoController.postArquivo);
routes.get('/arquivo', ArquivoController.getArquivo);

module.exports = routes;