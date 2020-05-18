import server from '../../server';
import Room from '../models/Room';
import User from '../models/User';
const io = require('socket.io')(server);

const setupSocketListeners = (socket) => {
    socket.on('join', (data) => {
        console.log('user connected')
        socket.join(data.roomId);
        socket.to(data.roomId).emit('userJoinedRoom', data.username);
    })

    socket.on('leave', (data) => {
        socket.to(data.roomId).emit('userLeftRoom', data.username);
    })

    socket.on('pause', (data) => {
        Room.findById(data.roomId, (err, foundRoom) => {
            if (foundRoom) {
                User.findOne({ username: data.username }, (err, foundUser) => {
                    if (foundUser) {
                        if (foundRoom.host === foundUser) {
                            socket.to(data.roomId).emit('pauseVideo', data.time);
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
                            socket.to(data.roomId).emit('playVideo', data.time);
                        }
                    }
                })
            }
        })
    })

    socket.on('message', (data) => {
        socket.to(data.roomId).emit('newMessage', data);
    })
}

export default setupSocketListeners;