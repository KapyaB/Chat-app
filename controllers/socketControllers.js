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
    socket.on('LOAD_1O1_CHAT', async (data, callback) => {
      try {
        const { user, corres } = data;
        const sender = await User.findById(user);
        const recep = await User.findById(corres);
        if (sender && recep) {
          const privateMsgs = await Chat.find({
            $and: [{ sender: sender.id }, { recepient: recep.id }]
          })
            .sort({ created: -1 })
            .limit(50);
          // emit new messages
          socket.emit('LOAD_MSGS', privateMsgs);
        }
      } catch (error) {
        if (error) throw error;
      }
    });

    // send msg
    socket.on('SEND_MSG', async (data, callback) => {
      try {
        const { msg, recepient } = data;

        // find recepient
        const recep = await User.findById(recepient._id);
        if (recep && msg !== '') {
          // save to database
          const newMsg = new Chat({
            sender: user.id,
            recepient: recep.id,
            msg
          });

          await newMsg.save();

          // recepient is online?
          const recepientSocket = await ActiveSocket.find({
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
