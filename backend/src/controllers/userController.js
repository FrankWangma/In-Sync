import User from '../models/User';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');

exports.createUser = (req, res) => {
  const newUser = new User(req.body);

  if (req.body.password) {
    newUser.hash = bcrypt.hashSync(req.body.password, 10);
  }

  newUser.save((err, createdUser) => {
    if (err) {
      res.send(err);
    }

    res.json(createdUser);
  });
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
      res.status(400).json({ message: `Username "${req.body.username}" is already taken` });
    } else {
      if (req.body.password) {
        req.body.hash = bcrypt.hashSync(req.body.password, 10);
      }

      Object.assign(foundUser, req.body);

      foundUser.save((error, updatedUser) => {
        if (error) {
          res.send(error);
        }

        res.json(updatedUser);
      });
    }
  });
};

exports.getAllUsers = (req, res) => {
  User.find({}, (err, foundUsers) => {
    if (err) {
      res.send(err);
    }

    res.json(foundUsers);
  });
};

exports.getUser = (req, res) => {
  User.findById(req.params.userId, (err, foundUser) => {
    if (err) {
      res.send(err);
    }

    res.json(foundUser);
  });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.userId, (err) => {
    if (err) {
      res.send(err);
    }

    res.status(202).json({ message: 'User Successfully Deleted' });
  });
};

exports.authenticate = (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (foundUser && bcrypt.compareSync(req.body.password, foundUser.hash)) {
      const token = jwt.sign({ sub: foundUser.id }, config.secret);
      res.send({ foundUser, token });
    } else {
      res.status(400).json({ message: 'Username or password is incorrect' });
    }
  });
};
