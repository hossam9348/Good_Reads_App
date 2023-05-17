const booksModel = require("../models/book");
const helpers = require("../utiles/helpers");

const getAllBooks = async (req, res,next) => {
  const {name,category,author} = req.query
  const filter = helpers.filtrationCriteria({name,category,author})
  const {page,limit,totalPages} = await helpers.paginationCriteria(
    booksModel,
    Number(req.query.page),
    Number(req.query.limit),
    filter);
  try {
    const books = await booksModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(['author']);
    return res.json({
      status: true,
      data: books,
      totalPages,
    });
  } catch (err) {
    return next(err);
  }
};

const getBookById = async (req, res ,next) => {
  const id = req.params.id;
  try {
    const books = await booksModel.findOne({ _id: id }).populate(['category','author']);
    return res.json({ status: true, data: books });
  } catch (err) {
    return next(error);
  }
};

const createBook = async (req, res ,next) => {
  try {
    const books = new booksModel(req.body);
    await books.save();
    return res.json({ status: true, data: books });
  } catch (err) {
    return next(error);
  }
};

const deleteBook = async (req, res,next) => {
  const id = req.params.id;
  try {
    await booksModel.deleteOne({ _id: id });
    return res.json({ status: true });
  } catch (err) {
    return next(err);
  }
};

const updateBook = async (req, res,next) => {
  const id = req.params.id;
  try {
    await booksModel.updateOne({ _id: id }, { $set: req.body });
    return res.json({ status: true });
  } catch (err) {
    return next(err);
  }
};

const partialUpdateBook = async (req, res,next) => {
  const id = req.params.id;
  try {
    const books = await booksModel.findOne({ _id: id });
    for (const key in books) {
      if (key in req.body) {
        books[key] = req.body[key];
      }
    }
    await booksModel.updateOne({ _id: id }, { $set: books });
    return res.json({ status: true });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
  partialUpdateBook,
};
