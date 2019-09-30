const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ActiveSocketSchema = new schema({
  socket: {
    type: Object
  },
  time: {
    type: Date,
    default: Date.now
  }
});

// create a collection in db
var ActiveSocket = mongoose.model('activeSocket', ActiveSocketSchema);

// export model
module.exports = ActiveSocket;
