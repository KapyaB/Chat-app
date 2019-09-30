const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./helpers/db');
const socketControllers = require('./controllers/socketControllers');

// connect to mongoDB
connectDB();

const app = express();

// Middleware
app.use(morgan('dev'));

// for html forms
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

// socket io requires that we have reference to a server
const server = require('http').createServer(app);
const io = (module.exports.io = require('socket.io')(server));

// fist thing to happen when a client connects
io.on('connection', socketControllers);
var port = process.env.PORT || 5000;
server.listen(port);
console.log(`Server running on port ${port}`);

// Routes
app.use('/api/users', require('./routes/users'));
