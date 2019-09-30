const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chatSchema = new schema({
  sender: {
    type: schema.Types.ObjectId,
    ref: 'user'
  },
  recepient: {
    type: schema.Types.ObjectId,
    ref: 'user'
  },
  msg: String,
  time: {
    type: Date,
    default: Date.now
  }
});

// create a collection in db
var Chat = mongoose.model('Chat', chatSchema);

// export model
module.exports = Chat;
