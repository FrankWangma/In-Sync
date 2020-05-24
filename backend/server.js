import app from './app.js';
import setupSocketListeners from './src/sockets/controller.js';
import http from 'http';
import SocketIO from 'socket.io';

const port = process.env.PORT || '5000';
const server = http.createServer(app);
const io = new SocketIO(server);

io.on('connection', (socket) => {
    setupSocketListeners(socket);
})

server.listen(port);
console.log(`listening on port: ${port}`);

export default server;