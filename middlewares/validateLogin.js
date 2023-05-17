const { body } = require('express-validator');

const validateEmailLogin = () => body('email')
  .isEmail()
  .normalizeEmail({ gmail_remove_dots: false }).trim();

const validatePasswordLogin = () =>
  body('password')
    .isStrongPassword();



module.exports =
{
  validateEmailLogin,
  validatePasswordLogin,
}