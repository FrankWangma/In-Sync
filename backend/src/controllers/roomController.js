import Room from '../models/Room';
import User from '../models/User';

exports.getRoom = (req, res) => {
  Room.findById(req.params.roomId, (err, foundRoom) => {
    if (err) {
      res.send(err);
    }

    res.json(foundRoom);
  });
};

exports.getAllRooms = (req, res) => {
  Room.find({}, (err, foundRooms) => {
    if (err) {
      res.send(err);
    }

    res.json(foundRooms);
  });
};

exports.createRoom = (req, res) => {
  const newRoom = new Room(req.body);

  newRoom.save((err, createdRoom) => {
    if (err) {
      res.send(err);
    }

    res.json(createdRoom);
  });
};

exports.updateRoom = (req, res) => {
  Room.findOneAndUpdate(
    { _id: req.params.roomId },
    req.body,
    {new: true},
    (err, foundRoom) => {
      if (err) {
        res.send(err);
      }

      res.json(foundRoom);
    },
  );
};

exports.deleteRoom = (req, res) => {
  Room.deleteOne({ _id: req.params.roomId }, (err) => {
    if (err) {
      res.send(err);
    }

    res.json({
      message: `Room ${req.params.id} successfully deleted`,
    });
  });
};

exports.joinRoom = (req, res) => {
  User.findById(req.body.userId, (err, foundUser) => {
    if (err) {
      res.send(err);
    }
    console.log(req.body.userId);
    console.log(req.body.id);
    Room.findById(req.body.id, (err, foundRoom) => {
      if (err) {
        res.send(err);
      }

      foundRoom.viewers.push(foundUser);
      foundRoom.save((err) => {
        if (err) {
          res.json(err)
        }

        res.json(foundRoom);
      })
    });
  });
};
