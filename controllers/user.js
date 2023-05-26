const usersModel = require('../models/user');
const helpers = require("../utiles/helpers");

const getAllUsers = async (req, res, next) => {
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);
  const noOfItems = await helpers.getNoOfItems(usersModel);
  if (page <= 0) {
    page = 1;
  }
  if (limit > noOfItems) {
    limit = noOfItems;
  }
  if (!page) {
    page = 1
  }
  if (!limit) {
    limit = 5
  }
  const totalPages = Math.ceil(noOfItems / limit);
  if (page > totalPages) {
    page = totalPages;
  }
  try {
    const users = await usersModel
      .find({})
      .skip((page - 1) * limit)
      .limit(limit).populate('books.bookId');
    return res.json({
      status: true,
      users,
      totalPages,
    });
  } catch (err) {
    return next(err);
  }
}

const getUserById = async (req, res, next) => {
  const id = req.params.id
  try {
    const User = await usersModel.find({ _id: id }).populate({ path: 'books.bookId', populate: { path: 'author', options: { strictPopulate: false } } });
    //  .populate({ path: 'books.bookId', populate: { path: 'author', options: { strictPopulate: false } } })
    return res.json({ status: true, User })
  }
  catch (err) {
    return next(err)
  }
}

const createUser = async (req, res, next) => {
  try {
    const User = new usersModel(req.body)
    await User.save();
    return res.json({ status: true, data: User });
  } catch (err) {
    return next(err)
  }
}

const deleteUser = async (req, res, next) => {
  const id = req.params.id
  try {
    await usersModel.deleteOne({ _id: id })
    return res.json({ status: true })
  }
  catch (err) {
    return next(err)
  }
}

const updateUser = async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await usersModel.updateOne({ _id: id }, { $set: req.body }, { new: true }).populate('books.bookId')
    return res.json({ status: true, user })
  }
  catch (err) {
    return next(err)
  }

}

const partialUpdateUser = async (req, res, next) => {
  const id = req.params.id
  try {
    const User = await usersModel.findOne({ _id: id });
    for (const key in User) {
      if (key in req.body) {
        User[key] = req.body[key]
      }
    }
    await usersModel.updateOne({ _id: id }, { $set: User })
    return res.json({ status: true })
  }
  catch (err) {
    return next(err)
  }

}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  partialUpdateUser,
};