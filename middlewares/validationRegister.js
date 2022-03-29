const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateRegister = celebrate({
  body: {
    email: Joi.string().required().custom((value) => {
      if (!validator.isEmail(value, { require_protocol: true })) {
        throw new Error('Неправильный формат Email');
      }
      return value;
    }),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  },
});

module.exports = validateRegister;
