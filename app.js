require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { NotFoundErr } = require('./errors');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/Logger');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, DATA_HOST, NODE_ENV } = process.env;

const app = express();
app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(auth);

app.use((req, res, next) => {
  next(new NotFoundErr('Не корректный URL'));
});

mongoose.connect(NODE_ENV === 'production' ? DATA_HOST : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
