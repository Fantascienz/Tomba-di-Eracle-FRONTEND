const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    testo: {
        type: String,
        required: true
    },

    inviatoAlle: {
        type: Date,
        required: true
    },

    idPersonaggio: {
        type: Number,
        required: true
    },

    nomePersonaggio: {
        type: String,
        required: true
    },

    idLocation: {
        type: Number,
        required: true
    },

    immagine: {
        type: String,
        required: true
    },

});

const Msg = mongoose.model('message', msgSchema);
module.exports = Msg;