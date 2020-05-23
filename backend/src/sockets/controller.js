import Room from '../models/Room.mjs';
import User from '../models/User.mjs';

const setupSocketListeners = (socket) => {
  socket.on('join', (data) => {
    socket.join(data.roomId);
    socket.to(data.roomId).emit('userJoinedRoom', data.username);
  });

  socket.on('leave', (data) => {
    socket.to(data.roomId).emit('userLeftRoom', data.username);
  });

  socket.on('pause', (data) => {
    socket.to(data.roomId).emit('pauseVideo', data.time);
    // Ignoring validating by user till login stuff set up
    // Room.findById(data.roomId, (err, foundRoom) => {
    //     if (foundRoom) {
    //         User.findOne({ username: data.username }, (err, foundUser) => {
    //             if (foundUser) {
    //                 if (foundRoom.host === foundUser) {
    //                     socket.to(data.roomId).emit('pauseVideo', data.time);
    //                 }
    //             }
    //         })
    //     }
    // })
  });

  socket.on('play', (data) => {
    socket.to(data.roomId).emit('playVideo', data.time);
    // Ignoring validating by user till the login stuff is set up
    // Room.findById(data.roomId, (err, foundRoom) => {
    //     if (foundRoom) {
    //         User.findOne({ username: data.username }, (err, foundUser) => {
    //             if (foundUser) {
    //                 if (foundRoom.host === foundUser) {
    //                     socket.to(data.roomId).emit('playVideo', data.time);
    //                 }
    //             }
    //         })
    //     }
    // })
  });

  socket.on('message', (data) => {
    socket.to(data.roomId).emit('newMessage', data);
  });
};

export default setupSocketListeners;
