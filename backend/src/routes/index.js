import { getAllRooms, joinRoom, createRoom, getRoom, updateRoom, deleteRoom } from '../controllers/roomController.js';
import { getAllUsers, createUser, getUser, updateUser, deleteUser, authenticate } from '../controllers/userController.js';

export default (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    next();
  });

  app.route('/room')
    .get(getAllRooms)
    .put(joinRoom)
    .post(createRoom);

  app.route('/room/:roomId')
    .get(getRoom)
    .put(updateRoom)
    .delete(deleteRoom);

  app.route('/user')
    .get(getAllUsers);

  app.route('/user/register')
    .post(createUser);

  app.route('/user/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

  app.route('/login')
    .post(authenticate);
};
