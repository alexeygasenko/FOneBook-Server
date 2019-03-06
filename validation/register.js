const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';

  if (!validator.isLength(data.name, { min: 4, max: 20 })) {
    errors.name = 'Name must be between 4 to 20 chars';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must have 8 chars';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  if (!validator.isLength(data.passwordConfirm, { min: 8, max: 30 })) {
    errors.passwordConfirm = 'Password must have 8 chars';
  }

  if (!validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = 'Password and Confirm Password must match';
  }

  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = 'Password confirmation is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}