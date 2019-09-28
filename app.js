const express = require('express');

const app = express();

// socket io requires that we have reference to a server
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var port = process.env.PORT || 5000;
server.listen(port);
console.log(`Server running on port ${port}`);

// routes
app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// fist thing to happen when a client connects
io.on('connection', function(socket) {
  // socket-the socket that the user is using to connect
  console.log('user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('send message', function(data) {
    // emit data to all users (self included)
    io.emit('new message', data);

    // send to all except me
    // socket.broadcast.emit('new message', data)
  });
});
