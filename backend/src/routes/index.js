import room from '../controllers/roomController';
import user from '../controllers/userController';

export default (app) => {
  app.route('/room')
    .get(room.getAllRooms)
    .put(room.joinRoom)
    .post(room.createRoom);

  app.route('/room/:roomId')
    .get(room.getRoom)
    .put(room.updateRoom)
    .delete(room.deleteRoom);

  app.route('/user')
    .get(user.getAllUsers)
    .post(user.createUser);

  app.route('/user/:userId')
    .get(user.getUser);

  app.route('/login')
    .get(user.login);
};
