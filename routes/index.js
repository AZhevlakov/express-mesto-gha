const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, register } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { registerValidate, loginValidate } = require('../middlewares/preValidate');
const { NotFoundError } = require('../errors');

router.post('/signin', loginValidate, login);
router.post('/signup', registerValidate, register);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('/', (req, res, next) => next(new NotFoundError('Page not found')));

module.exports = router;
