const bcrypt=require('bcrypt');
const jwt=require ('jsonwebtoken')
const userModel=require('../models/user');

const { validationResult } = require('express-validator');


const register = (req,res,next) => {
  const result = validationResult(req)
  if (!result.isEmpty()){
    console.log(result);
    const error = new Error()
          error.status = 400;
          error.array = result.array();
          return next(error)
  }
  return res.send(req.body.email)
}

const login = (req,res,next) => {

  const error = validationResult(req)
  if (!error.isEmpty()){
    next (new Error('invalid credentials'))
  }
  const email = req.email
  return res.send("sdasd")

  

}

module.exports={
  register,
  login,
}