import User from '../models/User';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');

exports.createUser = (req, res) => {
  const newUser = new User(req.body);

  if (req.body.password) {
    newUser.hash = bcrypt.hashSync(req.body.password, 10);
  }
  console.log(newUser.hash);

  newUser.save((err, createdUser) => {
    if (err) {
      res.send(err);
    }

    res.json(createdUser);
  });
};

exports.updateUser = (req, res) => {
  const user = User.findById(req.params.userId);

  if (!user) {
    res.status(400).json({ message: 'User not found' })
  } else if(user.username !== req.body.username && User.findOne({ username: req.body.username })) {
    res.status(400).json({ message: 'Username "' + req.body.username + '" is already taken'});
  } else {
    if (req.body.password) {
      req.body.hash = bcrypt.hashSync(req.body.password, 10);
    }

    Object.assign(user, req.body);

    user.save((err, updatedUser) => {
      if (err) {
        res.send(err);
      }

      res.json(updatedUser);
    });
  }
}

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
  })
}

exports.authenticate = (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (foundUser && bcrypt.compareSync(req.body.password, foundUser.hash)) {
      const token = jwt.sign({ sub: foundUser.id }, config.secret);
      res.send({ foundUser, token });
    } else {
      res.status(400).json({ message: 'Username or password is incorrect' })
    }
  });
}
