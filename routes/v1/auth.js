const authRouter = require('express').Router();
const authController = require('../../controllers/auth')

const {
    validateEmail,
    validateFirstName,
    validateLastName,
    validatePassword1,
    validatePassword2
} = require('../../middlewares/validateRegister')

const validateImage = require('../../middlewares/validateImage')



const {
    validateEmailLogin,
    validatePasswordLogin
} = require('../../middlewares/validateLogin')

authRouter.post('/register',
    validateImage,
    [
        validateFirstName(),
        validateLastName(),
        validateEmail(),
        validatePassword1(),
        validatePassword2()
    ],
    authController.register)

authRouter.post('/login', [
    validateEmailLogin(),
    validatePasswordLogin()
], authController.login)

module.exports = authRouter