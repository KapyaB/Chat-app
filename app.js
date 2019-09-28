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

var usernames = [];

// fist thing to happen when a client connects
io.on('connection', function(socket) {
  // socket-the socket that the user is using to connect
  console.log('user connected');

  socket.on('new user', function(data, callback) {
    // callback because we are sending back data to the code that emitted the event
    // check username array
    if (usernames.includes(data)) {
      callback(false);
    } else {
      callback(true);
      // add to array
      socket.username = data;
      usernames.push(socket.username);

      updateUsernames();
    }
  });

  // emit new usernames
  function updateUsernames() {
    io.emit('usernames', usernames);
  }

  socket.on('disconnect', function() {
    console.log('user disconnected');
    // check if user has name
    if (socket.username) {
      return;
    } else {
      usernames.splice(usernames.indexOf(socket.username), 1);
      updateUsernames();
    }
  });
  socket.on('send message', function(data) {
    // emit data to all users (self included)
    io.emit('new message', { msg: data, username: socket.username });

    // send to all except me
    // socket.broadcast.emit('new message', data)
  });
});
