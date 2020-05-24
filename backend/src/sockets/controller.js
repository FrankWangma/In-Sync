// eslint-disable-next-line import/extensions
import Room from '../models/Room.js';
// eslint-disable-next-line import/extensions
import User from '../models/User.js';

const clients = [];

const setupSocketListeners = (socket) => {
  socket.on('join', (data) => {
    let alreadyExists = false;
    const len = clients.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < len; i++) {
      const client = clients[i];
      if (client.clientId === socket.id) {
        socket.leave(client.roomId);
        socket.join(data.roomId);
        alreadyExists = true;
      }
    }
    if (!alreadyExists) {
      // eslint-disable-next-line no-new-object
      const clientInfo = new Object();
      clientInfo.clientId = socket.id;
      clientInfo.username = data.username;
      clientInfo.roomId = data.roomId;
      clients.push(clientInfo);
      socket.join(data.roomId);
    }
    socket.to(data.roomId).emit('userJoinedRoom', data.username);
  });

  socket.on('pause', (data) => {
    clients.forEach((client) => {
      if (client.clientId === socket.id) {
        if (client.roomId) {
          // eslint-disable-next-line no-unused-vars
          Room.findById(client.roomId, (err, foundRoom) => {
            if (foundRoom) {
              // eslint-disable-next-line no-unused-vars
              User.findOne({ username: client.username }, (error, foundUser) => {
                if (foundUser) {
                  if (foundRoom.host === foundUser.username) {
                    socket.to(data.roomId).emit('pauseVideo', data.time);
                  }
                }
              });
            }
          });
        }
      }
    });
  });

  socket.on('play', (data) => {
    clients.forEach((client) => {
      if (client.clientId === socket.id) {
        if (client.roomId) {
          // eslint-disable-next-line no-unused-vars
          Room.findById(client.roomId, (err, foundRoom) => {
            if (foundRoom) {
              // eslint-disable-next-line no-unused-vars
              User.findOne({ username: client.username }, (error, foundUser) => {
                if (foundUser) {
                  if (foundRoom.host === foundUser.username) {
                    socket.to(data.roomId).emit('playVideo', data.time);
                  }
                }
              });
            }
          });
        }
      }
    });
  });

  socket.on('message', (data) => {
    socket.to(data.roomId).emit('newMessage', data);
  });

  socket.on('change', (data) => {
    socket.to(data.roomId).emit('changeVideo', data);
  });

  socket.on('leaveRoom', () => {
    clients.forEach((client, index) => {
      if (client.clientId === socket.id) {
        if (client.roomId) {
          // eslint-disable-next-line no-unused-vars
          Room.findById(client.roomId, (err, foundRoom) => {
            if (foundRoom) {
              // eslint-disable-next-line no-unused-vars
              User.findOne({ username: client.username }, (error, foundUser) => {
                if (foundUser) {
                  if (foundRoom.host === foundUser.username) {
                    socket.to(client.roomId).emit('hostLeft', client.username);
                    Room.findOneAndDelete({ _id: client.roomId });
                  } else {
                    socket.to(client.roomId).emit('userLeft', client.username);
                  }
                  Room.findOneAndUpdate({ _id: client.roomId },
                    { $pullAll: { viewers: [client.username] } });
                }
              });
            }
          });
          clients.splice(index, 1);
        }
      }
    });
  });

  socket.on('disconnect', () => {
    clients.forEach((client, index) => {
      if (client.clientId === socket.id) {
        if (client.roomId) {
          socket.to(client.roomId).emit('userLeft', client.username);
          Room.findOneAndUpdate({ _id: client.roomId },
            { $pullAll: { viewers: [client.username] } });
          socket.leave(client.roomId);
        }
        clients.splice(index, 1);
      }
    });
  });
};

export default setupSocketListeners;
