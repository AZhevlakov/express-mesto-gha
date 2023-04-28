const { celebrate, Joi } = require('celebrate');
const { urlRegExp, passwordRegExp } = require('../utils/constants');

// const authValidate = celebrate({
//   headers: Joi.object().keys({
//     authorization: Joi.string().regex(/^[-*_$\\/.a-zA-Z0-9]+$/).required(),
//   }).unknown(true),
// });

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).regex(passwordRegExp).required(),
  }),
});

const registerValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().regex(urlRegExp).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).regex(passwordRegExp).required(),
  }),
});

const idValidate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

const updateUserProfileValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const updateUserAvatarValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegExp).required(),
  }),
});

const createCardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(urlRegExp).required(),
  }),
});

module.exports = {
  // authValidate,
  loginValidate,
  registerValidate,
  idValidate,
  updateUserProfileValidate,
  updateUserAvatarValidate,
  createCardValidate,
};
