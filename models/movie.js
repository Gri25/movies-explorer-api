const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String,
    required: true,
  },
  director: { // режиссёр фильма
    type: String,
    required: true,
  },
  duration: { // длительность фильма
    type: Number,
    required: true,
  },
  year: { // год выпуска фильма
    type: String,
    required: true,
  },
  description: { // описание фильма
    type: String,
    required: true,
  },
  image: { // ссылка на постер к фильму
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
    },
    message: 'Не корректно введен URL!',
  },
  trailerLink: { // ссылка на трейлер фильма
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
    },
    message: 'Не корректно введен URL!',
  },
  thumbnail: { // миниатюрное изображение постера к фильму
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
    },
    message: 'Не корректно введен URL!',
  },
  owner: [ // _id пользователя, который сохранил фильм
    {
      type: mongoose.Schema.Types.ObjectId, // это вроде как для того что бы сделать ссылку на юзера
      ref: 'user',
      default: [], // не знаю нужно ли это
      required: true,
    },
  ],
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer
    required: true, // мне кажется что это не единственное свойство надо разбираться что ещё нужно
  },
  nameRU: { // название фильма на русском языке
    type: String,
    required: true, // с языками наверное нужно будет тоже что-то добавить
  },
  nameEN: { // название фильма на английском языке
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('card', movieSchema);
