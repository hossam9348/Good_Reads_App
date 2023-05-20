const authRouter = require('express').Router();
const authController = require('../../controllers/auth')

const validateRegister = require('../../middlewares/validateRegister')

const validateImage = require('../../middlewares/validateImage')



const validateLogin = require('../../middlewares/validateLogin')

authRouter.post('/register',
    validateImage,
    [
        validateRegister.FirstName(),
        validateRegister.LastName(),
        validateRegister.Email(),
        validateRegister.Password1(),
        validateRegister.Password2()
    ],
    authController.register)

authRouter.post('/login', [
    validateLogin.Email(),
    validateLogin.Password()
], authController.login)

module.exports = authRouter