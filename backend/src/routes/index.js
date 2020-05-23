import roomController from '../controllers/roomController.js';
import userController from '../controllers/userController.js';

export default (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    next();
  });

  app.route('/room')
    .get(roomController.getAllRooms)
    .put(roomController.joinRoom)
    .post(roomController.createRoom);

  app.route('/room/:roomId')
    .get(roomController.getRoom)
    .put(roomController.updateRoom)
    .delete(roomController.deleteRoom);

  app.route('/user')
    .get(userController.getAllUsers);

  app.route('/user/register')
    .post(userController.createUser);

  app.route('/user/:userId')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

  app.route('/login')
    .get(userController.authenticate);
};
