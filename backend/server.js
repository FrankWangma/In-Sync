import app from './app';

const port = process.env.PORT || '3000';
server = app.listen(port);

const io = require("socket.io")(server);

io.on('connection', (socket) => {
    console.log('New user connected')
    
    socket.on('join_room', (data) => {
        socket.join(data.roomId);
    })
})

console.log(`Listening on port ${port}`);

export default io;