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
    clients.forEach((client,index) => {
      if (client.clientId === socket.id ) {
        if (client.roomId) {
          Room.findById(client.roomId, (err, foundRoom) => {
            if (foundRoom) {
              console.log('found room');
              User.findOne({ username: client.username }, (err, foundUser) => {
                if (foundUser) {
                  console.log('found user')
                  if (foundRoom.host === foundUser.username) {
                    socket.to(data.roomId).emit('pauseVideo', data.time);
                  }
                }
              })
            }
          })
        }
      }
    });
  });

  socket.on('play', (data) => {
    clients.forEach((client,index) => {
      if (client.clientId === socket.id ) {
        if (client.roomId) {
          Room.findById(client.roomId, (err, foundRoom) => {
            if (foundRoom) {
              console.log('found room');
              User.findOne({ username: client.username }, (err, foundUser) => {
                if (foundUser) {
                  console.log('found user')
                  if (foundRoom.host === foundUser.username) {
                    socket.to(data.roomId).emit('playVideo', data.time);
                  }
                }
              })
            }
          })
        }
      }
    });
  });

  socket.on('message', (data) => {
    socket.to(data.roomId).emit('newMessage', data);
  });

  socket.on('leaveRoom', () => {
    console.log(socket.id);
    clients.forEach((client,index) => {
      if (client.clientId === socket.id ) {
        if (client.roomId) {
          Room.findById(client.roomId, (err, foundRoom) => {
            if (foundRoom) {
              console.log('found room');
              User.findOne({ username: client.username }, (err, foundUser) => {
                if (foundUser) {
                  console.log('found user')
                  if (foundRoom.host === foundUser.username) {
                    console.log("found host");
                    socket.to(client.roomId).emit('hostLeft', client.username);
                  } else {
                    socket.to(client.roomId).emit('userLeft', client.username);
                  }
                  Room.findOneAndUpdate({ _id: client.roomId }, { $pullAll: {viewers: [client.username] }});
                }
              })
            }
          });
          clients.splice(index, 1);
        }
      }
    });
  });

  socket.on('disconnect', () => {
    clients.forEach((client,index) => {
      if (client.clientId === socket.id ) {
        if (client.roomId) {
          socket.to(client.roomId).emit('userLeft', client.username);
          Room.findOneAndUpdate({ _id: client.roomId }, { $pullAll: {viewers: [client.username] }});
          socket.leave(client.roomId);
        }
        clients.splice(index, 1);
      }
    });
  });

}

export default setupSocketListeners;
