const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetsSchema = new Schema({
    id: {
        type: Number,
        startAt: 658,
        incrementBy: 1
    },
    idDono: {
        type: Number,
        required: true
    },
    nomePet: {
        type: String,
        required: true
    },
    nomeDono: {
        type: String,
        required: true
    },
    idadePet: {
        type: Number,
        required: true
    },
    racaPet: {
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
        required: false
    },
    cidade: {
        type: String,
        required: true
    },
    inseridoEm: {
        type: Date,
        default: (new Date()).getTime()
    },
    inseridoPor: {
        type: Number,
        required: true
    },
    possuiRg: {
        type: Boolean,
        default: false
    },
    vacinas: {
        type: String,
        required: false
    },
    doencas:{
        type: String,
        required: false
    },
    informacoesAdicionais:{
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Pets', PetsSchema)