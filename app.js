const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { limiterConfig } = require('./config');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;
const router = require('./routes');

const limiter = rateLimit(limiterConfig);

app.use(helmet());
app.use(limiter);
app.use(cors);
// app.use(cookieParser());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger); // логгер запросов

// для ревью - для проверки восстановления сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router); // обработчик роутов

app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
