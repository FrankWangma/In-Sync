import room from '../controllers/roomController';
import user from '../controllers/userController';

export default (app) => {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
    .get(user.getAllUsers)
    .post(user.createUser);

  app.route('/user/:userId')
    .get(user.getUser);

  app.route('/login')
    .get(user.login);
};
