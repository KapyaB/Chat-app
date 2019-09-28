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

var users = {};

// fist thing to happen when a client connects
io.on('connection', function(socket) {
  // socket-the socket that the user is using to connect
  console.log('user connected');

  socket.on('new user', function(data, callback) {
    // callback because we are sending back data to the code that emitted the event
    // check username array
    if (data in users) {
      callback(false);
    } else {
      callback(true);
      // add to array
      socket.username = data;
      users[socket.username] = socket;

      updateUsernames();
    }
  });

  // emit new usernames
  function updateUsernames() {
    io.emit('usernames', Object.keys(users));
  }

  socket.on('disconnect', function() {
    console.log('user disconnected');
    // check if user has name
    if (!socket.username) {
      return;
    } else {
      delete users[socket.username];
      updateUsernames();
    }
  });
  socket.on('send message', function(data, callback) {
    // whisper (send private msg)
    var msg = data.trim();
    // a whisper msg begins with '/w ' 3 chars
    if (msg.substring(0, 3) === '/w ') {
      msg = msg.substring(3);
      // recepients name follows the whisper syntax and ends at first space
      var ind = msg.indexOf(' ');
      if (ind !== -1) {
        // check if user name is valid
        var name = msg.substring(0, ind);
        var msg = msg.substring(ind + 1);

        if (name in users) {
          users[name].emit('whisper', {
            msg,
            username: socket.username
          });
        } else {
          callback('Error, Username not valid');
        }
      } else {
        // no space== no message
        callback('Error, Please enter a message');
      }
    } else {
      // emit data to all users (self included)
      io.emit('new message', { msg: data, username: socket.username });
    }

    // send to all except me
    // socket.broadcast.emit('new message', data)
  });
});
