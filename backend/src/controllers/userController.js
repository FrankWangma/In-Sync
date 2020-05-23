import User from '../models/User';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');

exports.createUser = (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
    res.status(400).json({ message: 'Invalid input: All fields must be filled' });
  } else {
    const newUser = new User(req.body);

    newUser.hash = bcrypt.hashSync(req.body.password, 10);

    newUser.save((err, createdUser) => {
      if (err) {
        res.status(409).json({ message: 'Username or email already taken' });
      } else {
        res.json(createdUser);
      }
    });
  }
};

function usernameExists(name) {
  User.findOne({ username: name }, (err, foundUser) => {
    if (foundUser) {
      return true;
    }
    return false;
  });
}

exports.updateUser = (req, res) => {
  User.findById(req.params.userId, (err, foundUser) => {
    if (!foundUser) {
      res.status(400).json({ message: 'User not found' });
    } else if (foundUser.username !== req.body.username && usernameExists(req.body.username)) {
      res.status(409).json({ message: `Username "${req.body.username}" is already taken` });
    } else {
      if (req.body.password) {
        req.body.hash = bcrypt.hashSync(req.body.password, 10);
      }

      Object.assign(foundUser, req.body);

      foundUser.save((error, updatedUser) => {
        if (error) {
          if (error.keyValue) {
            res.status(409).json({ message: 'Username or email already exist' });
          } else {
            res.status(500).json({ message: 'Server failed to update user' });
          }
        } else {
          res.json(updatedUser);
        }
      });
    }
  });
};

exports.getAllUsers = (req, res) => {
  User.find({}, (err, foundUsers) => {
    if (err) {
      res.status(500).json({ message: 'Server failed to get users' });
    } else {
      res.json(foundUsers);
    }
  });
};

exports.getUser = (req, res) => {
  User.findById(req.params.userId, (err, foundUser) => {
    if (err) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(foundUser);
    }
  });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.userId, (err) => {
    if (err) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(202).json({ message: 'User Successfully Deleted' });
    }
  });
};

exports.authenticate = (req, res) => {
  const secret = process.env.INSYNC_API_SECRET || config;
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (foundUser && bcrypt.compareSync(req.body.password, foundUser.hash)) {
      const token = jwt.sign({ sub: foundUser.id }, secret);
      res.send({ foundUser, token });
    } else {
      res.status(400).json({ message: 'Username or password is incorrect' });
    }
  });
};
