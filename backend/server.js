import app from './app';

const port = process.env.PORT || '3000';
const server = require('http').createServer(app);

import Room from './src/models/Room';
import User from './src/models/User';
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('New user connected')
    
    socket.on('join', (data) => {
        socket.join(data.roomId);
        io.sockets.in(data.roomId).emit('userJoinedRoom', data.username);
    })

    socket.on('leave', (data) => {
        socket.leave(data.roomId)
        io.sockets.in(data.roomId).emit('userLeftRoom', data.username);
    })

    socket.on('pause', (data) => {
        Room.findById(data.roomId, (err, foundRoom) => {
            if (foundRoom) {
                User.findOne({ username: data.username }, (err, foundUser) => {
                    if (foundUser) {
                        if (foundRoom.host === foundUser) {
                            io.sockets.in(data.roomId).emit('pauseVideo', data.time);
                        }
                    }
                })
            }
        })
    })

    socket.on('play', (data) => {
        Room.findById(data.roomId, (err, foundRoom) => {
            if (foundRoom) {
                User.findOne({ username: data.username }, (err, foundUser) => {
                    if (foundUser) {
                        if (foundRoom.host === foundUser) {
                            io.sockets.in(data.roomId).emit('playVideo', data.time);
                        }
                    }
                })
            }
        })
    })
})

server.listen(port);

export default server;