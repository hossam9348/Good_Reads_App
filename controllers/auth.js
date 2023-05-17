const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const fs=require("fs")
const userModel = require('../models/user');
const signAccessToken = require("../utiles/signAccessToken");



const register = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      fs.unlinkSync(req.file.path);
      const error = new Error()
      error.status = 400;
      error.array = result.array();
      return next(error)
    }

    const { firstname, lastname, email, password1, role, image } = req.body;

    encryptedPassword = await bcrypt.hash(password1, 10);

    const newuser = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: encryptedPassword,
      imgUrl: `/${req.file.path}`
    }
    if (role) {
      newuser.role = role
    }
    const user = await userModel.create(newuser);
    const token = signAccessToken(user);
    return res.status(201).json({ user: user, token: token });

  } catch (err) {
    console.log(err);
  }
};

const login = ("/login", async (req, res, next) => {
  try {

    const result = validationResult(req);
    if (!result.isEmpty()) {
      const error = new Error()
      error.status = 400;
      error.array = result.array();
      return next(error)
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = signAccessToken(user);
      return res.status(200).json({ user: user, token: token });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }

});
module.exports = {
  register,
  login,
}