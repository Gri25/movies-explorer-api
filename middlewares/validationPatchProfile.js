const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validationPatchProfile = celebrate({
  body: {
    email: Joi.string().required().custom((value) => {
      if (!validator.isEmail(value, { require_protocol: true })) {
        throw new Error('Неправильный формат Email');
      }
      return value;
    }),
    name: Joi.string().min(2).max(30).required(),
  },
});

module.exports = validationPatchProfile;
