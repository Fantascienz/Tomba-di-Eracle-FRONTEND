const express = require('express');
const socketio = require("socket.io");
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom, getUsersInlocation, cambioLocation, getPersonaggi } = require('./src/server/users');

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
    const { error, user } = addUser({ id: socket.id, personaggio, location });
    if (error) {
      const personaggi = getPersonaggi();
      console.log(personaggi);
      socket.emit('locationData', { personaggi });
      Msg.find().then(result => {
        socket.emit('output-messages', result)
      })
    } else {
      const personaggi = getPersonaggi();
      socket.emit('locationData', { personaggi });

      Msg.find().then(result => {

        socket.emit('output-messages', result)
        socket.emit('message', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, ti diamo il benvenuto!`, idLocation: location.id });
        socket.broadcast.emit('message', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${location.nome}`, idLocation: location.id });
      })
    }

    socket.join(location);

    // io.to(user.location).emit('roomData', { location: user.location, users: getUsersInRoom(user.location) });

    callback();
  });

  socket.on('getList', () => {
    const personaggi = getPersonaggi();
    socket.emit('listaOnline', { personaggi })
  })

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
        idPersonaggio: personaggio.id,
        nomePersonaggio: personaggio.nominativo,
        idLocation: location.id,
        immagine: personaggio.urlImmagine
      });

    })


    callback();
  })


  socket.on('uscitaLocation', ({ personaggio, ultimaLocation }) => {
    socket.broadcast.emit('messageUscitaLocation', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo} si sposta da ${ultimaLocation.nome}`, idLocation: ultimaLocation.id })

  })

  socket.on('entrataNuovaLocation', ({ personaggio, location, ultimaLocation }) => {
    cambioLocation({ id: socket.id, personaggio, location });

    if (location == ultimaLocation.direzioni.idLocationNord) {
      socket.emit('messageEntrataLocation', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${ultimaLocation.direzioni.nomeLocationNord}!`, idLocation: location });
      socket.broadcast.emit('messageEntrataLocation', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${ultimaLocation.direzioni.nomeLocationNord}!`, idLocation: location });
    } else if (location == ultimaLocation.direzioni.idLocationSud) {
      socket.emit('messageEntrataLocation', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${ultimaLocation.direzioni.nomeLocationNord}!`, idLocation: location });
      socket.broadcast.emit('messageEntrataLocation', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${ultimaLocation.direzioni.nomeLocationNord}!`, idLocation: location });
    } else if (location == ultimaLocation.direzioni.idLocationOvest) {
      socket.emit('messageEntrataLocation', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${ultimaLocation.direzioni.nomeLocationOvest}!`, idLocation: location });
      socket.broadcast.emit('messageEntrataLocation', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${ultimaLocation.direzioni.nomeLocationOvest}!`, idLocation: location });
    } else if (location == ultimaLocation.direzioni.idLocationEst) {
      socket.emit('messageEntrataLocation', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${ultimaLocation.direzioni.nomeLocationEst}!`, idLocation: location });
      socket.broadcast.emit('messageEntrataLocation', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, entra in ${ultimaLocation.direzioni.nomeLocationEst}!`, idLocation: location });
    }
  })

  socket.on('logout', ({ location, personaggio }) => {
    removeUser(socket.id);
    socket.broadcast.emit('message', { nomePersonaggio: 'admin', testo: `${personaggio.nominativo}, ha effettuato il logout!`, idLocation: location })
  })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));