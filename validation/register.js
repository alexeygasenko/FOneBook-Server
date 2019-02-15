const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateInput(data) {
  let error = {};
  data.login = !isEmpty(data.login) ? data.login : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

  if (!validator.isLength(data.login, { min: 4, max: 32 })) {
    error.login = 'Логин должен содержать от 4 до 32 символов';
  }

  if (validator.isEmpty(data.login)) {
    error.login = `Поле 'Логин' обязательно`;
  }

  if (!validator.isEmail(data.email)) {
    error.email = 'Неверный Email';
  }

  if (validator.isEmpty(data.email)) {
    error.email = `Поле 'Email' обязательно`;
  }

  if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    error.password = 'Пароль должен содержать от 8 символов';
  }

  if (validator.isEmpty(data.password)) {
    error.password = `Поле 'Пароль' обязательно`;
  }

  if (!validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
    error.password_confirm = 'Пароль должен содержать от 8 символов';
  }

  if (!validator.equals(data.password, data.password_confirm)) {
    error.password_confirm = 'Поля с паролем и подтверждением пароля должны совпадать';
  }

  if (validator.isEmpty(data.password_confirm)) {
    error.password_confirm = `Поле 'Пароль' обязательно`;
  }

  return {
    error,
    isValid: isEmpty(error)
  }
}