const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';

  if (!validator.isLength(data.name, { min: 4, max: 20 })) {
    errors.name = 'Логин должен быть длиной от 4 до 20 символов';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = `Поле 'Логин' обязательно`;
  }

  if (!validator.isEmail(data.email)) {
    errors.email = `Поле 'Email' некорректно`;
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

  if (!validator.isLength(data.passwordConfirm, { min: 8 })) {
    errors.passwordConfirm = 'Пароль должен состоять не менее чем из 8 символов';
  }

  if (!validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = 'Поля с паролем и подтверждением пароля должны совпадать';
  }

  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = 'Подтвердите пароль';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}