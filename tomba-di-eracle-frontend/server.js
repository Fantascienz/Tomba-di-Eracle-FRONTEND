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
    Msg.find({ idLocation: location.id }).then(result => {
      socket.emit('output-messages', result)
      socket.emit('message', { testo: `${personaggio.nominativo},entra in ${location.nome}`, idLocation: location.id });
      // socket.broadcast.to(user.location).emit('message', { utente: 'admin', testo: `${user.personaggio.nominativo}, has joined!` });
    })



    socket.join(location);

    // io.to(user.location).emit('roomData', { location: user.location, users: getUsersInRoom(user.location) });

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
      
      
      socket.emit('message', {
        testo: formValue,
        nomePersonaggio: personaggio.nominativo,
        idLocation: location.id,
        immagine: personaggio.urlImmagine
      });
      // io.to(user.location).emit('roomData', { location: user.location, users: getUsersInRoom(user.location) })
    })


    callback();
  })

  // socket.on('disconnect', () => {
  //   const user = removeUser(socket.id);

  //   if (user) {
  //     io.to(location).emit('message', { user: 'admin', testo: `${user.personaggio.nominativo} has left` });
  //   }

  // })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));