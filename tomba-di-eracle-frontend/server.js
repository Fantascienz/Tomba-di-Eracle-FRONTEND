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

mongoose.connect(urlDatabase, { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.once('open', _ => {
  console.log('Database connected', urlDatabase);
});

db.on('error', _ => {
  console.error('connection error:', err);
});


io.on('connect', (socket) => {
    socket.on('join', ({name,room}, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
      Msg.find({location:room}).then(result =>{
        socket.emit('output-messages', result)
        socket.emit('message', {  utente: 'admin', testo: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { utente: 'admin', testo: `${user.name}, has joined!`});
      })
      if(error) return callback(error);
      
      
      
      socket.join(user.room);

      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

      callback();
    });

    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
      const messaggio = new Msg({testo: message, utente: user.name, location: user.room});
      messaggio.save().then(() => {
        io.to(user.room).emit('message', { utente: user.name, testo: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})
      })


      callback();
    })

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      
      if(user) {
        io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left`}); 
      }
    
    })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));