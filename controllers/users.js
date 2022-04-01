const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  NotFoundErr,
  BadRequestErr,
  UnAutorizedErr,
  ConflictErr,
} = require('../errors');

const User = require('../models/user');

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SOLT_ROUND = 10;

const getUserMe = (req, res, next) => {
  // const { email } = req.body;
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundErr('Пользователь по переданному id не найден');
      }
    })
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  // обновим имя найденного по _id пользователя
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, он будет создан
    },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundErr('Пользователь по переданному id не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, SOLT_ROUND)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then(() => res.status(200).send({
          data: {
            email, name,
          },
        }))
        .catch((err) => {
          if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
            next(new ConflictErr('Такой пользователь уже существует'));
          }
          if (err.name === 'ValidationError') {
            next(new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      // создадим токен
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      // вернём токен
      res.send({ token });
    })
    .catch(() => {
      next(new UnAutorizedErr('Неправильная почта или пароль'));
    });
};

module.exports = {
  createUser,
  updateProfile,
  login,
  getUserMe,
};
