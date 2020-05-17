import app from './app';

const port = process.env.PORT || '3000';
const server = require('http').createServer(app);
server.listen(port);

export default server;