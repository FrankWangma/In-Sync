import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function createUser(req, res) {
  if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
    res.status(400).json({ message: 'Invalid input: All fields must be filled' });
  } else {
    const newUser = new User(req.body);

    newUser.hash = bcrypt.hashSync(req.body.password, 10);

    newUser.save((err, createdUser) => {
      if (err) {
        if (err.keyValue.username) {
          res.status(409).json({ message: `Username ${req.body.username} is already taken` });
        } else if (err.keyValue.email) {
          res.status(409).json({ message: `Email ${req.body.email} is already taken` });
        }
      } else {
        res.json(createdUser);
      }
    });
  }
}

function usernameExists(name) {
  User.findOne({ username: name }, (err, foundUser) => {
    if (foundUser) {
      return true;
    }
    return false;
  });
}

export function updateUser(req, res) {
  User.findById(req.params.userId, (err, foundUser) => {
    if (!foundUser) {
      res.status(400).json({ message: 'User not found' });
    } else if (foundUser.username !== req.body.updatedUser.username && usernameExists(req.body.updatedUser.username)) {
      res.status(409).json({ message: `Username "${req.body.updatedUser.username}" is already taken` });
    } else {
      if (req.body.updatedUser.password) {
        req.body.hash = bcrypt.hashSync(req.body.updatedUser.password, 10);
      }

      Object.assign(foundUser, req.body.updatedUser);

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
}

export function getAllUsers(req, res) {
  User.find({}, (err, foundUsers) => {
    if (err) {
      res.status(500).json({ message: 'Server failed to get users' });
    } else {
      res.json(foundUsers);
    }
  });
}

export function getUser(req, res) {
  User.findById(req.params.userId, (err, foundUser) => {
    if (err) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(foundUser);
    }
  });
}

export function deleteUser(req, res) {
  User.findByIdAndRemove(req.params.userId, (err) => {
    if (err) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(202).json({ message: 'User Successfully Deleted' });
    }
  });
}

export function authenticate(req, res) {
  // Previously a config file was used to provide the secret locally, however that caused issues with
  // nodemon, so a hardcoded string is used instead.
  const secret = process.env.INSYNC_API_SECRET || "local so can use any string";
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (foundUser && bcrypt.compareSync(req.body.password, foundUser.hash)) {
      const token = jwt.sign({ sub: foundUser.id }, secret);
      res.send({ foundUser, token });
    } else {
      res.status(400).json({ message: 'Username or password is incorrect' });
    }
  });
}
