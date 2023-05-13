const {  body } = require('express-validator')

const emailValidation = () => body('email').isEmail().normalizeEmail()

const passwordValidation = () => body('password').isStrongPassword()



module.exports ={
  emailValidation,
}