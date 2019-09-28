const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.MONGO_URI; // get the uri in default.json

// connect to mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected . . .');
  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
