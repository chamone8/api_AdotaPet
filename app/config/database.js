const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://chamone:wdZj28jKqNiMx2Eu@node-v001.nwj0m.mongodb.net/TCC?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

mongoose.connection.on('connected', () =>{
    console.log('Conectado com o banco de dados');
})

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão ', + err);
})

mongoose.connection.on('disconnect', ()=>{
    console.log('Desconectado ;(')
})
