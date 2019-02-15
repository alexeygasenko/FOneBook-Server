const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let error = {};
  data.login = !isEmpty(data.login) ? data.login : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (validator.isEmpty(data.login)) {
    error.login = `Поле 'Логин' обязательно`;
  }

  if (!validator.isLength(data.login, { min: 4, max: 20 })) {
    error.login = 'Логин должен содержать от 4 до 20 символов';
  }

  if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    error.password = 'Пароль должен содержать от 8 символов';
  }

  if (validator.isEmpty(data.password)) {
    error.password = `Поле 'Пароль' обязательно`;
  }

  return {
    error,
    isValid: isEmpty(error)
  }
}