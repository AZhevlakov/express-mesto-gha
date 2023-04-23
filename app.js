const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3005 } = process.env;
const router = require('./routes');

const limiter = rateLimit(
  {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  },
);

app.use(helmet());
app.use(limiter);

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '6443f2aba9444f4d230309cf',
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
