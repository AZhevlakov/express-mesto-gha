const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    link: {
      type: String,
      validate: {
        validator(url) {
          return /^https?:\/\/(www\.)?[-a-zA-Z0-9.]{2,255}\.[a-z]{2,11}([-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]+)#?$/.test(url);
        },
        message: 'Is not a valid url',
      },
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
