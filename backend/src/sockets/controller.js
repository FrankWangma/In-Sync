import Room from '../models/Room.js';
import User from '../models/User.js';

var clients = [];

const setupSocketListeners = (socket) => {

  socket.on('join', (data) => {
    var alreadyExists = false;
    const len = clients.length
    for (var i = 0; i < len; i++) {
      var client = clients[i];
      if (client.clientId === socket.id) {
        socket.leave(client.roomId)
        socket.join(data.roomId);
        alreadyExists = true;
      }
    }
    if (!alreadyExists) {
      var clientInfo = new Object();
      clientInfo.clientId = socket.id;
      clientInfo.username = data.username;
      clientInfo.roomId = data.roomId;
      clients.push(clientInfo);
      socket.join(data.roomId);
    }
    socket.to(data.roomId).emit('userJoinedRoom', data.username);
  });

  socket.on('pause', (data) => {
    socket.to(data.roomId).emit('pauseVideo', data.time);
    if (userIsHost(data.roomId, data.username)) {
      socket.to(data.roomId).emit('pauseVideo', data.time);
    }
  });

  socket.on('play', (data) => {
    socket.to(data.roomId).emit('playVideo', data.time);
    // Ignoring validating by user till the login stuff is set up
    if (userIsHost(data.roomId, data.username)) {
      socket.to(data.roomId).emit('playVideo', data.time);
    }
  });

  socket.on('message', (data) => {
    socket.to(data.roomId).emit('newMessage', data);
  });

  socket.on('leaveRoom', () => {

    clients.forEach((client,index) => {
      if (client.clientId === socket.id ) {
        if (client.roomId) {
          if (userIsHost(client.roomId, client.username)) {
            socket.to(client.roomId).emit('hostLeft', client.username);
          } else {
            socket.to(client.roomId).emit('userLeft', client.username);
          }
          removeFromRoom(client);
        }
        clients.splice(index, 1);
      }
    });
  })

  socket.on('disconnect', () => {
    clients.forEach((client,index) => {
      if (client.clientId === socket.id ) {
        if (client.roomId) {
          if (userIsHost(client.roomId, client.username)) {
            socket.to(client.roomId).emit('hostLeft', client.username);
          } else {
            socket.to(client.roomId).emit('userLeft', client.username);
          }
          removeFromRoom(client);
        }
        clients.splice(index, 1);
      }
    });
  });
};

const removeFromRoom = (client) => {
  Room.findOneAndUpdate({ _id: client.roomId }, { $pullAll: {viewers: [client.username] }});
}

const userIsHost = (roomId, inputUsername) => {
  Room.findById(roomId, (err, foundRoom) => {
    if (foundRoom) {
      User.findOne({ username: inputUsername }, (err, foundUser) => {
        if (foundUser) {
          if (foundRoom.host === foundUser) {
            return true;
          }
        }
      })
    }
  })
  return false;
}

export default setupSocketListeners;
