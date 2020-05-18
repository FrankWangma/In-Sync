import server from '../../server';
import Room from '../models/Room';
import User from '../models/User';
const io = require('socket.io')(server);

setupSocketListeners = (socket) => {
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

    socket.on('message', (data) => {
        io.sockets.in(data.roomId).emit('newMessage', data);
    })
}

export default setupSocketListeners;