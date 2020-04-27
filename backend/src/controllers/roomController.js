import Room from '../models/roomModel';

exports.getRoom = (req, res) => {
  Room.findById(req.params.id, (err, foundRoom) => {
    if (err) {
      res.send(err);
    }

    res.json(foundRoom);
  });
};

exports.getAllRooms = (req, res) => {
  Room.find({}, (err, foundRoom) => {
    if (err) {
      res.send(err);
    }

    res.json(foundRoom);
  });
};

exports.createRoom = (req, res) => {
  const newRoom = new Room(req.body);

  newRoom.save((err, foundRoom) => {
    if (err) {
      res.send(err);
    }

    res.json(foundRoom);
  });
};

exports.updateRoom = (req, res) => {
  Room.findOneAndUpdate({
    _id: req.params.id,
  }, req.body,
  (err, foundRoom) => {
    if (err) {
      res.send(err);
    }

    res.json(foundRoom);
  });
};

exports.deleteRoom = (req, res) => {
  Room.remove({
    _id: req.params.id,
  }, (err) => {
    if (err) {
      res.send(err);
    }

    res.json({
      message: `Room ${req.params.id} successfully deleted`,
    });
  });
};
