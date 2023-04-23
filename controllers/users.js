const User = require('../models/user');
const { errCodes } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(errCodes.InternalServerError).send({ message: 'Internal Server Error' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errCodes.BadRequestError).send({ message: 'Invalid id' });
        return;
      }
      if (err.message === 'NotFound') {
        res.status(errCodes.NotFoundError).send({ message: 'User not found' });
        return;
      }
      res.status(errCodes.InternalServerError).send({ message: 'Internal Server Error' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errCodes.BadRequestError).send({ message: 'Incorrect data was transmitted' });
      } else {
        res.status(errCodes.InternalServerError).send({ message: 'Internal Server Error' });
      }
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errCodes.BadRequestError).send({ message: 'Incorrect data was transmitted' });
        return;
      }
      res.status(errCodes.InternalServerError).send({ message: 'Internal Server Error' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errCodes.BadRequestError).send({ message: 'Incorrect data was transmitted' });
        return;
      }
      res.status(errCodes.InternalServerError).send({ message: 'Internal Server Error' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
