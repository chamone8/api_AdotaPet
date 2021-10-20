const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArquivoSchema = new Schema({
    id: {
        type: Number,
        required: false, 
        startAt: 1,
        incrementBy: 1
    },
    base64: {
        type: String,
        required: true
    },
    idPet: {
        type: String,
        required: false
    },
    Iddono: {
        type: String,
        required: false
    },
    inseridoEm: {
        type: String,
        required: true,
        default: (new Date()).getTime()
    }

})

module.exports = mongoose.model('Arquivo', ArquivoSchema)