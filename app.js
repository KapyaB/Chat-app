const express = require('express');

const connectDB = require('./helpers/db');
const socketControllers = require('./controllers/socketControllers');

// connect to mongoDB
connectDB();

const app = express();

// socket io requires that we have reference to a server
const server = require('http').createServer(app);
const io = (module.exports.io = require('socket.io')(server));

// fist thing to happen when a client connects
io.on('connection', socketControllers);
var port = process.env.PORT || 5000;
server.listen(port);
console.log(`Server running on port ${port}`);

// routes
app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
