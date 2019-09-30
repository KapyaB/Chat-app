var app = require('../app.js');
const Chat = require('../models/Chats');
const User = require('../models/User');

var users = {};
module.exports = async function(socket) {
  // socket-the socket that the user is using to connect
  const io = app.io;

  const user = await User.findById(socket.handshake.query.user);

  // retrieve messages// get last 8
  const msgs = await Chat.find()
    .sort({ created: -1 })
    .limit(8);
  socket.emit('load old messages', msgs);
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
    // check if user has name
    console.log('Socket disconnected');
    if (!socket.username) {
      return;
    } else {
      delete users[socket.username];
      updateUsernames();
    }
  });
  socket.on('send message', async function(data, callback) {
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
      // save message
      var newMsg = new Chat({
        msg: data,
        name: socket.username
      });
      await newMsg.save(function(err) {
        if (err) {
          throw err;
        }
      });
      // emit data to all users (self included)
      io.emit('new message', {
        msg: data,
        username: socket.username
      });
    }

    // send to all except me
    // socket.broadcast.emit('new message', data)
  });
};
