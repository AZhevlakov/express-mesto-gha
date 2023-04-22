const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { PORT = 3005 } = process.env;
const router = require('./routes');


app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '6443f2aba9444f4d230309cf'
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
