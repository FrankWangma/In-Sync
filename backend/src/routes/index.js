import room from '../controllers/roomController';
import user from '../controllers/userController';

export default (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    next();
  });

  app.route('/room')
    .get(room.getAllRooms)
    .put(room.joinRoom)
    .post(room.createRoom);

  app.route('/room/:roomId')
    .get(room.getRoom)
    .put(room.updateRoom)
    .delete(room.deleteRoom);

  app.route('/user')
    .get(user.getAllUsers);

  app.route('/user/register')
    .post(user.createUser);

  app.route('/user/:userId')
    .get(user.getUser)
    .put(user.updateUser)
    .delete(user.deleteUser);

  app.route('/login')
    .post(user.authenticate);
};
