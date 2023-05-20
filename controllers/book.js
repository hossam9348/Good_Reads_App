const booksModel = require("../models/book");
const helpers = require("../utiles/helpers");
const userModel = require("../models/user")
const categoryModel = require("../models/category")
const authorModel = require("../models/author")
const { validationResult } = require('express-validator');
const fs = require("fs")

const getAllBooks = async (req, res, next) => {
  // const query = req.query
  let filter={}
  if (req.query.author){
    filter.author=req.query.author
  }
  if (req.query.category) {
    filter.category = req.query.category
  }
  if (req.query.name) {
    filter.name = req.query.name
  }
  // const filter = {name:} 
  const { page, limit, totalPages } = await helpers.paginationCriteria(
    booksModel,
    Number(req.query.page),
    Number(req.query.limit),
    filter);
  try {
    const books = await booksModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(['category','author']);
      console.log(books,filter)
    return res.json({
      status: true,
      books,
      totalPages,
    });
  } catch (err) {
    return next(err);
  }
};

const getBookById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const books = await booksModel.findOne({ _id: id }).populate(['category', 'author']);
    return res.json({ status: true, data: books });
  } catch (err) {
    return next(err);
  }
};

const createBook = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      if (req.file) {

        fs.unlinkSync(req.file.path);
      }
      const error = new Error()
      error.status = 400;
      error.array = result.array();
      return next(error)
    }
    const { name, author, category } = req.body;
    const authorObject = await authorModel.findById(author)
    const categoryObject = await categoryModel.findById(category)
    const newBook = { name, author: authorObject, category: categoryObject, imgUrl: `/${req.file.path}` };

    const book = await booksModel.create(newBook);

    return res.json({ status: true, book });
  } catch (err) {
    return next(err);
  }
};

const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  try {
    await booksModel.deleteOne({ _id: id });
    return res.json({ status: true });
  } catch (err) {
    return next(err);
  }
};

const updateBook = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      if (req.file) { fs.unlinkSync(req.file.path); }
      const error = new Error()
      error.status = 400;
      error.array = result.array();
      return next(error)
    }

    const { name, author, category } = req.body;
    const updatedBook = { name, author, category, imgUrl: `/${req.file.path}` };

    await booksModel.findOneAndUpdate({ _id: id }, { $set: updatedBook }, { new: true });

    return res.json({ status: true });
  } catch (err) {
    return next(err);
  }
};

const partialUpdateBook = async (req, res, next) => {
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

// www.localhost:5000/books/:id/add-to-wish-list
//  need to rewriten as soon as possible
const addBookToWishList = async (req, res, next) => {

  try {
    const id = req.params.id
    let { rate, status } = req.body
    rate > 5 ? rate = 5 : rate
    // const book = await booksModel.findById(id)

    // check if book in user wish list
    let hasDoc = await userModel.countDocuments(
      { _id: req.user.user_id, "books.bookId": id });

    if (hasDoc > 0) {

      //  update book if founded
      const user = await userModel.findOneAndUpdate(
        {
          _id: req.user.user_id,
          "books.bookId": id
        }, {
        $set: {
          "books.$.rate": rate,
          "books.$.status": status,
        }
      }, { new: true })
      const book = await booksModel.findOneAndUpdate({
        _id: id,
        "rating.user": req.user.user_id
      }, {
        $set: {
          "rating.$.rate": rate,
       
        }
      }, { new: true, useFindAndModify: false, aggregate: true })
      if (book) {
        const sum = book.rating.reduce((total, r) => total + r.rate, 0);
        book.rate = sum / book.rating.length;

        await book.save();
      }
      return res.send(user)
    }

    //  add book if not  founded
    const user = await userModel.findOneAndUpdate(
      {
        _id: req.user.user_id,

      }, {
      $push: {
        books: {
          "bookId": id,
        }
      }
    },
      {
        new: true
      })

    const book = await booksModel.findOneAndUpdate(
      {
        _id: id,

      }, {
      $push: {
        rating: {
          "user": req.user.user_id,
          "rate": 0
        },
        // $set: { rate: { $avg: "$rating.$.rate" } }
      }
    },
      {
        new: true, useFindAndModify: false, aggregate: true
      })
    if (book) {
      const sum = book.rating.reduce((total, r) => total + r.rate, 0);
      book.rate = sum / book.rating.length;

      await book.save();
    }
    // console.log(book)
    return res.send(user)
  } catch (error) {
    console.log("error", error)
  }

}
module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
  partialUpdateBook,
  addBookToWishList,
};


    // const user = await userModel.findOneAndUpdate(
    //   {
    //     _id: req.user.user_id,
    //     books: { $elemMatch: { bookId: book._id } }
    //     //  book._id
    //     //  {

    //     //   $ne: book._id
    //     // }

    //   },
    //   {
    //     $set: {
    //       "books.$.rate": rate,
    //       "books.$.status": status,
    //     },
    //     $setOnInsert: {
    //       books: {
    //         'bookId': book._id,
    //         rate: rate,
    //         status: status
    //       }
    //     }
    //   }
    //   ,
    //   { upsert: true, new: true });