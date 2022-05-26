const { celebrate, Joi } = require('celebrate');

const validationMovieId = celebrate({
  params: {
    id: Joi.string().length(24).hex().required(),
  },
});

module.exports = validationMovieId;
