var app = require('../app.js');
const Chat = require('../models/Chats');
const User = require('../models/User');
const ActiveSocket = require('../models/ActiveSockets');
const TestUser = require('../models/TestUsers');

module.exports = async function(socket) {
  try {
    // socket-the socket that the user is using to connect
    const io = app.io;
    const query = socket.handshake.query;
    const user = await User.findById(query.user);
    // console.log('A new user has connected');
    // const newUser = new ActiveSocket({ socket });
    // await newUser.save();

    // retrieve 1on1 chat
    // get last 50
    socket.on('LOAD_1O1_CHAT', async (data, callback) => {
      try {
        const { user, corres } = data;
        if (user && corres) {
          const privateMsgs = await Chat.find({
            $and: [{ sender: user }, { recepient: corres }]
          })
            .sort({ created: -1 })
            .limit(50);
          // emit messages
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

          const privateMsgs = await Chat.find({
            $and: [{ sender: user.id }, { recepient: recep.id }]
          });

          // emit messages
          socket.emit('LOAD_MSGS', privateMsgs);

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
        console.log(socket.query);
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
