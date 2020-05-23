import app from './app.js';
import setupSocketListeners from './src/sockets/controller';

const port = process.env.PORT || '3000';
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    setupSocketListeners(socket);
})

server.listen(port);

export default server;