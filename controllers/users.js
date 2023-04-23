const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      res.status(400).send({ message: 'Некорректный id' });
      return;
    })
    .then(user => res.send(user))
    .catch(err => {
      if (err.message.includes('Cast to ObjectId failed')) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(201).send(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors)
          .map(error => error.message)
          .join(', ');
        res.status(400).send({ message: message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  console.log(name, about);

  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about
    },
    {
      new: true,
      runValidators: true
    }
  )
    .orFail(() => {
      res.status(400).send({ message: 'Некорректный id' });
      return;
    })
    .then(user => res.send(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors)
          .map(error => error.message)
          .join(', ');
        res.status(400).send({ message: message });
        return;
      }
      if (err.message.includes('Cast to ObjectId failed')) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar
    },
    {
      new: true,
      runValidators: true
    }
  )
    .orFail(() => {
      res.status(400).send({ message: 'Некорректный id' });
      return;
    })
    .then(user => res.send(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors)
          .map(error => error.message)
          .join(', ');
        res.status(400).send({ message: message });
        return;
      }
      if (err.message.includes('Cast to ObjectId failed')) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar
};