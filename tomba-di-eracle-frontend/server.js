const express = require('express');
const socketio = require("socket.io");
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./src/server/users');

const PORT = process.env.PORT || 5000;

const router = require('./src/server/router');

const mongoose = require('mongoose');

const Msg = require('./src/server/models/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const urlDatabase = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.prkjr.mongodb.net/chat?retryWrites=true&w=majority';

mongoose.connect(urlDatabase, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', _ => {
  console.log('Database connected', urlDatabase);
});

db.on('error', _ => {
  console.error('connection error:', err);
});


io.on('connect', (socket) => {
  socket.on('join', ({ personaggio, location }, callback) => {
    Msg.find().then(result => {
      socket.emit('output-messages', result)
      socket.emit('message', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${location.nome}`, idLocation: location.id });
      socket.broadcast.emit('message', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${location.nome} !`, idLocation: location.id });
    })
    socket.join(location);
    callback();
  });

  socket.on('sendMessage', ({ formValue, personaggio, location }, callback) => {
    const messaggioInviato = new Msg(
      {
        testo: formValue,
        inviatoAlle: new Date(),
        idPersonaggio: personaggio.id,
        nomePersonaggio: personaggio.nominativo,
        idLocation: location.id,
        immagine: personaggio.urlImmagine
      });
    messaggioInviato.save().then(() => {

      io.emit('message', {
        testo: formValue,
        nomePersonaggio: personaggio.nominativo,
        idLocation: location.id,
        immagine: personaggio.urlImmagine
      });
    })
    callback();
  })

  socket.on('uscitaLocation', ({ personaggio, ultimaLocation }) => {
    socket.broadcast.emit('message', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo} si sposta da ${ultimaLocation.nome}`, idLocation: ultimaLocation.id })
  })

  socket.on('entrataNuovaLocation', ({ personaggio, location, ultimaLocation }) => {
    if(location == ultimaLocation.direzioni.idLocationNord) {
      socket.broadcast.emit('message', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${ultimaLocation.direzioni.nomeLocationNord}!`, idLocation: location });
    } else if (location == ultimaLocation.direzioni.idLocationSud) {
      socket.broadcast.emit('message', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${ultimaLocation.direzioni.nomeLocationNord}!`, idLocation: location });
    } else if (location == ultimaLocation.direzioni.idLocationOvest) {
      socket.broadcast.emit('message', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${ultimaLocation.direzioni.nomeLocationOvest}!`, idLocation: location });
    } else if (location == ultimaLocation.direzioni.idLocationEst) {
      socket.broadcast.emit('message', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${ultimaLocation.direzioni.nomeLocationEst}!`, idLocation: location });
    }
  })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));