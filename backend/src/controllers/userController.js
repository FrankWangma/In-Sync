import User from '../models/User';

exports.createUser = (req, res) => {
  const newUser = new User(req.body);

  newUser.save((err, createdUser) => {
    if (err) {
      res.send(err);
    }

    res.json(createdUser);
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

// Login will be updated with auth stuff eventually for now just get
//  user by id & password
exports.login = (req, res) => {
  User.findOne({
    username: req.body.username,
    password: req.body.password,
  }, (err, foundUser) => {
    if (err) {
      res.send(err);
    }

    res.json(foundUser);
  });
};
