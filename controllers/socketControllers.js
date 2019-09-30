var app = require('../app.js');
const Chat = require('../models/Chats');
const User = require('../models/User');
const ActiveSocket = require('../models/ActiveSockets');

module.exports = async function(socket) {
  try {
    // socket-the socket that the user is using to connect
    const io = app.io;
    const query = socket.handshake.query;
    // // persist to active sockets collection
    // socket.user = query.user;
    // const newSocket = new ActiveSocket({ socket });
    // await newSocket.save();
    // console.log(newSocket);
    const user = await User.findById(query.user);

    // retrieve 1on1 chat
    // get last 50
    const privateMsgs = await Chat.find({
      $and: [{ sender: query.user }, { recepient: query.corres }]
    })
      .sort({ created: -1 })
      .limit(50);
    socket.emit('LOAD_1O1_CHAT', privateMsgs);

    // send msg
    socket.on('SEND_MSG', async (data, callback) => {
      try {
        const { msg, recepient } = data;

        // find recepient
        const recep = await User.findById(recepient._id);
        console.log(recep);
        if (recep && msg !== '') {
          // save to database
          const newMsg = new Chat({
            sender: user.id,
            recepient: recepient.id,
            msg
          });

          await newMsg.save();

          // recepient is online?
          const recepientSocket = await Socket.find({
            'socket.user': recepient.id
          });
          if (recepientSocket) {
            io.to(`${recepientSocket.id}`).emit('RECEIVE_MSG', newMsg);
          }
        }
      } catch (err) {
        if (err) {
          throw err;
        }
      }
      // emit data to all users (self included)
      io.emit('new message', {
        msg: data,
        username: socket.username
      });

      // send to all except me
      // socket.broadcast.emit('new message', data)

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
    });
  } catch (err) {
    console.error(err.message);
  }
};
