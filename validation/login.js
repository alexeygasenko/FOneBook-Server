const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!validator.isEmail(data.email)) {
    errors.email = 'Неверный Email';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = `Поле 'Email' обязательно`;
  }

  if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = 'Пароль должен состоять не менее чем из 8 символов';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = `Поле 'Пароль' обязательно`;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}