import room from '../controllers/roomController';

export default (app) => {
    app.route('/rooms')
        .get(room.getAllRooms)
        .post(room.createRoom);

    app.route('/room/:roomId')
        .get(room.getRoom)
        .put(room.updateRoom)
        .delete(room.deleteRoom);
};