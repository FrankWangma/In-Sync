import Room from '../models/Room.js';
import User from '../models/User.js';

var clients = [];

const setupSocketListeners = (socket) => {
  socket.on('join', (data) => {
    var clientInfo = new Object();
    clientInfo.clientId = socket.id;
    clientInfo.username = data.username;
    clientInfo.roomId = data.roomId;
    clients.push(clientInfo);
    console.log('user connected');
    socket.join(data.roomId, () => {
      console.log(socket.rooms)
    });
    socket.to(data.roomId).emit('userJoinedRoom', data.username);
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

  socket.on('disconnect', () => {
    const len = clients.length
    for (var i = 0; i < len; i++) {
      var client = clients[i];
      console.log(socket.id);
      if (client.clientId === socket.id ) {
        console.log(client.roomId);
        socket.to(client.roomId).emit('userLeft', client.username);
        clients.splice(i, 1);
      }
    }
  });
};

export default setupSocketListeners;
