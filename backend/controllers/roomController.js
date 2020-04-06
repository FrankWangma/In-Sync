import mongoose from 'mongoose'; 
import room from '../models/roomModel.js';

exports.getRoom = (req, res) => {
    room.findById(req.params.id, (err, room) => {
        if (err) {
            res.send(err);
        }

        res.json(room);
    });
};

exports.getAllRooms = (req, res) => {
    room.find({}, (err, room) => {
        if (err) {
            res.send(err);
        }

        res.json(room);
    });
};

exports.createRoom = (req, res) => {
    const newRoom = new room(req.body);

    newRoom.save((err, room) => {
        if (err) {
            res.send(err);
        }

        res.json(room);
    });
};

exports.updateRoom = (req, res) => {
    room.findOneAndUpdate({
        _id: req.params.id
    }, req.body,
        (err, room) => {
            if (err) {
                res.send(err);
            }

            res.json(room);
        });
};

exports.deleteRoom = (req, res) => {
    room.remove({
        _id: req.params.id
    }, (err) => {
        if (err) {
            res.send(err);
        }

        res.json({
            message: `Room ${req.params.id} successfully deleted`
        });
    });
};