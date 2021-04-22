const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    testo: {
        type: String,
        required: true
    },

    utente: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    }
});

const Msg = mongoose.model('message', msgSchema);
module.exports = Msg;