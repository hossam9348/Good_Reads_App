const express = require('express');
const v1Router = express.Router();
const bookRouter = require('./book')
const authorRouter = require('./author')
const categoryRouter = require('./category')
const authRouter = require('./auth')
const userRouter = require('./user')


v1Router.use('/v1/books', bookRouter)
v1Router.use('/v1/authors', authorRouter)
v1Router.use('/v1/categories', categoryRouter)
v1Router.use('/v1/users', userRouter)
// v1Router.use('/v1/auth', authRouter)

module.exports = v1Router