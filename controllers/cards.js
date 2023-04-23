const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then(cards => res.send(cards))
    .catch(err => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then(card => res.status(201).send(card))
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

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      res.status(400).send({ message: 'Некорректный id' });
      return;
    })
    .then(() => res.status(200).send({ message: 'Пост удалён' }))
    .catch(err => {
      if (err.message.includes('Cast to ObjectId failed')) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      res.status(400).send({ message: 'Некорректный id' });
      return;
    })
    .then(card => res.send(card))
    .catch(err => {
      if (err.message.includes('Cast to ObjectId failed')) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      res.status(400).send({ message: 'Некорректный id' });
      return;
    })
    .then(card => res.send(card))
    .catch(err => {
      if (err.message.includes('Cast to ObjectId failed')) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};