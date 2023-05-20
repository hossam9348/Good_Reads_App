const { body } = require('express-validator');

const Email = () => body('email')
  .isEmail()
  .normalizeEmail({ gmail_remove_dots: false }).trim();

const Password = () =>
  body('password')
    .isStrongPassword();


const validateLogin={Email,Password}
module.exports =validateLogin