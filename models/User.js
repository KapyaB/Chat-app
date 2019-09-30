const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
  username: String,
  email: {
    type: String,
    lowercase: true
  },
  password: {
    type: String
  },

  dateAdded: {
    type: Date,
    default: Date.now()
  }
});

// create model
const User = mongoose.model('user', UserSchema);

// export model
module.exports = User;
