const express = require('express');
const app = express();
const path = require('path');

// Settings

app.set('port', process.env.PORT || 3000);

// Static Files

app.use(express.static(path.join(__dirname, 'public')));

// Start the server

const server = app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

const SocketIO = require('socket.io');
const io = SocketIO(server);

// Websockets

io.on('connection', socket => {
  console.log('New connection', socket.id);

  socket.on('chat:message', data => {
    io.sockets.emit('chat:message', data);
  });

  socket.on('chat:typing', data => {
    socket.broadcast.emit('chat:typing', data);
  });
});
