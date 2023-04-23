const Card = require('../models/card');
const { errCodes } = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch(() => res.status(errCodes.InternalServerError).send({ message: 'Internal Server Error' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errCodes.BadRequestError).send({ message: 'Incorrect data was transmitted' });
      } else {
        res.status(errCodes.InternalServerError).send({ message: 'Internal Server Error' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then(() => res.status(200).send({ message: 'Пост удалён' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errCodes.BadRequestError).send({ message: 'Invalid id' });
        return;
      }
      if (err.message === 'NotFound') {
        res.status(errCodes.NotFoundError).send({ message: 'Card not found' });
        return;
      }
      res.status(errCodes.InternalServerError).send({ message: 'Internal Server Error' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errCodes.BadRequestError).send({ message: 'Invalid id' });
        return;
      }
      if (err.message === 'NotFound') {
        res.status(errCodes.NotFoundError).send({ message: 'Card not found' });
        return;
      }
      res.status(errCodes.InternalServerError).send({ message: 'Internal Server Error' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errCodes.BadRequestError).send({ message: 'Invalid id' });
        return;
      }
      if (err.message === 'NotFound') {
        res.status(errCodes.NotFoundError).send({ message: 'Card not found' });
        return;
      }
      res.status(errCodes.InternalServerError).send({ message: 'Internal Server Error' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
