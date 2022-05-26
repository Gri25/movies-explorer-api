const Movie = require('../models/movie');
const { NotFoundErr, BadRequestErr, ForbiddenErr } = require('../errors');

const getMovies = (req, res, next) => {
  Movie.find(req.user._id)
    .then((movies) => res.send({ data: movies }))
    .catch((err) => {
      next(err);
    });
};

const createMovies = (req, res, next) => {
  const ownerId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    movieId,
    thumbnail,
  } = req.body;
  // записываем данные в базу
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: ownerId,
  })
    // возвращаем записанные в базу данные карточки
    .then((movie) => res.send({ data: movie }))
    // если данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

const deleteMovies = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .orFail(() => new NotFoundErr('Карточка по переданному id не найдена'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenErr('Нельзя удалить чужую карточку'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovies,
  deleteMovies,
};
