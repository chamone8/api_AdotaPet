const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    id: {
        type: Number,
        required: true, 
        startAt: 1573,
        incrementBy: 1
    },
    nome: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: false
    },
    telefone: {
        type: String,
        required: false
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    inseridoEm: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Usuario', UsuarioSchema)