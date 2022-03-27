// const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { UnAutorizedErr, ForbiddenErr } = require('../errors');

module.exports = (req, res, next) => {
  // тут будет вся авторизация
  const { authorization } = req.headers;
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnAutorizedErr('Необходима авторизация');
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    // payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    // верхняя строчка для версии с env
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new ForbiddenErr('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
