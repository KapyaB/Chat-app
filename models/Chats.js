const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chatSchema = new schema({
  name: String,
  msg: String,
  created: {
    type: Date,
    default: Date.now
  }
});

// create a collection in db
var Chat = mongoose.model('Chat', chatSchema);

// export model
module.exports = Chat;
