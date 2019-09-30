const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TestUsersSchema = new schema({
  username: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  }
});

// create a collection in db
var TestUsers = mongoose.model('TestUser', TestUsersSchema);

// export model
module.exports = TestUsers;
