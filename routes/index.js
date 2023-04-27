const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, register } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { registerValidate, loginValidate, authValidate } = require('../middlewares/preValidate');

router.post('/signin', loginValidate, login);
router.post('/signup', registerValidate, register);

router.use(auth);

router.use('/users', authValidate, userRouter);
router.use('/cards', authValidate, cardRouter);
router.use('/', (req, res) => {
  res.status(404).send({ message: 'Page not found' });
});

module.exports = router;
