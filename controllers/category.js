const { validationResult } = require('express-validator');

const categoryModel = require('../models/category');
const authorModel = require('../models/author');
const helpers = require("../utiles/helpers");

const getAllCategories = async (req, res, next) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 5;

  const noOfItems = await helpers.getNoOfItems(categoryModel);

  const totalPages = Math.ceil(noOfItems / limit);
  if (page > totalPages) {
    page = totalPages;
  }

  try {
    const categories = await categoryModel
      .find({})
      .skip((page - 1) * limit)
      .limit(limit);
    return res.json({
      status: true,
      categories,
      totalPages,
    });
  } catch (err) {
    return next(err);
  }
}

const getCategoryById = async (req, res, next) => {
  const id = req.params.id
  try {
    const category = await categoryModel.find({ _id: id });
    return res.json({ status: true, category })
  }
  catch (err) {
    return next(err)
  }
}

const createCategory = async (req, res) => {
  try {

    const result = validationResult(req);
    if (!result.isEmpty()) {
      const error = new Error()
      error.status = 400;
      error.array = result.array();
      return next(error)
    }
    const { name } = req.body
    const category = await categoryModel.create({ name })
    return res.json({ status: true, category });
  } catch (err) {
    return next(err)
  }
}

const deleteCategory = async (req, res) => {
  const id = req.params.id
  try {
    await categoryModel.deleteOne({ _id: id })
    return res.json({ status: true })
  }
  catch (err) {
    return next(err)
  }
}

const updateCategory = async (req, res) => {
  const id = req.params.id
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const error = new Error()
      error.status = 400;
      error.array = result.array();
      return next(error)
    }
    const { name } = req.body
    await categoryModel.updateOne({ _id: id }, { $set: { name } }, { new: true })
    return res.json({ status: true })
  }
  catch (err) {
    return next(err)
  }

}

// const partialUpdateCategory = async (req, res) => {
//   const id = req.params.id
//   try {
//     const category = await categoryModel.findOne({ _id: id });
//     for (const key in category) {
//       if (key in req.body) {
//         category[key] = req.body[key]
//       }
//     }
//     await categoryModel.updateOne({ _id: id }, { $set: category })
//     return res.json({ status: true })
//   }
//   catch (err) {
//     return next(err)
//   }

// }

const getCategoryAuthor = async (req, res) => {
  try {
    const categories = await categoryModel.find({}, { name: 1 })
    const authors = await authorModel.find({}, { firstName: 1, lastName: 1 })
    return res.json({
      status: true,
      categories,
      authors,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryAuthor,
};