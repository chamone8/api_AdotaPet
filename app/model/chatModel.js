const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatBoxSchema = new Schema({
    idChatBox: {
        type: Number,
        startAt: 658,
        incrementBy: 1
    },
    nome: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: false
    },
    inseridoEm: {
        type: Date,
        required: true,
        default: (new Date()).getTime()
    },
    inseridoPor: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    Aberto: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Chat', ChatBoxSchema)