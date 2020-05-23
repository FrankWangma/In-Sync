import Room from '../models/Room.js';
import User from '../models/User.js';

export function getRoom(req, res) {
  Room.findById(req.params.roomId, (err, foundRoom) => {
    if (foundRoom) {
      res.json(foundRoom);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  });
}
export function getAllRooms(req, res) {
  Room.find({}, (err, foundRooms) => {
    if (foundRooms) {
      res.json(foundRooms);
    } else {
      res.status(404).json({ message: 'Could not find rooms' });
    }
  });
}

export function createRoom(req, res) {
  const newRoom = new Room(req.body);

  if (!req.body.host) {
    res.status(400).json({ message: 'Host required to create a room' });
  } else {
    newRoom.save((err, createdRoom) => {
      if (createdRoom) {
        res.json(createdRoom);
      } else {
        res.status(500).json({ message: 'There was an error creating the room' });
      }
    });
  }
}

export function updateRoom(req, res) {
  Room.findOneAndUpdate(
    { _id: req.params.roomId },
    req.body,
    { new: true },
    (err, foundRoom) => {
      if (foundRoom) {
        res.json(foundRoom);
      } else {
        res.status(404).json({ message: 'Could not find room' });
      }
    },
  );
}

export function deleteRoom(req, res) {
  Room.deleteOne({ _id: req.params.roomId }, (err) => {
    if (err) {
      res.status(404).json({ message: 'Could not find room' });
    } else {
      res.json({
        message: 'Room successfully deleted',
      });
    }
  });
}

export function joinRoom(req, res) {
  User.findById(req.body.userId, (err, foundUser) => {
    if (err) {
      res.status(404).json({ message: 'Could not find user' });
    } else {
      Room.findById(req.body.id, (error, foundRoom) => {
        if (!foundRoom) {
          res.status(404).json({ message: 'Could not find room' });
        } else {
          foundRoom.viewers.push(foundUser.username);
          foundRoom.save((errorSave) => {
            if (errorSave) {
              res.status(500).json({ message: 'Server failed to add user to room' });
            } else {
              res.json(foundRoom);
            }
          });
        }
      });
    }
  });
}
