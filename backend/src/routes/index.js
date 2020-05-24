import {
  getAllRooms, joinRoom, createRoom, getRoom, updateRoom, deleteRoom,
  // eslint-disable-next-line import/extensions
} from '../controllers/roomController.js';
import {
  getAllUsers, createUser, getUser, updateUser, deleteUser, authenticate,
  // eslint-disable-next-line import/extensions
} from '../controllers/userController.js';

export default (app) => {
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

  app.route('/register')
    .post(createUser);

  app.route('/user/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

  app.route('/login')
    .post(authenticate);
};
