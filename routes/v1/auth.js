const express=require('express');
const authRouter=express.Router();
// const authMiddleware = require('../../middlewares/auth')  
const {emailValidation} = require ('../../middlewares/validation')

const authController=require ('../../controllers/auth')

authRouter.post('/register',[emailValidation()],authController.register)
authRouter.post('/login',emailValidation(),authController.login)

module.exports = authRouter