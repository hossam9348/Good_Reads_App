const authorModel = require('../models/author');
const helpers = require("../utiles/helpers");

const getAllAuthors = async (req, res, next) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 5;
  const noOfItems = await helpers.getNoOfItems(authorModel);

  const totalPages = Math.ceil(noOfItems / limit);
  if (page > totalPages) {
    page = totalPages;
  }
  try {
    const authors = await authorModel.find({}).skip((page - 1) * limit).limit(limit);

    return res.json(
      {
        status: true,
        authors,
        totalPages,
      });
  } catch (err) {
    next(err);
  }
}



const getAuthorById = async (req, res, next) => {
  const id = req.params.id
  try {
    const author = await authorModel.find({ _id: id });
    return res.json({ status: true, author })
  }
  catch (err) {
    console.log(err);
    return next(err)
  }
}

const createAuthor = async (req, res, next) => {
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

    const { firstname, lastname, date_of_birth } = req.body;


    const newAuthor = {
      firstname: firstname,
      lastname: lastname,
      DOB: date_of_birth

    }
    if (req.file) {
      newAuthor.imgUrl = `/${req.file.path}`
    }
    const author = new authorModel.create(newAuthor)
    return res.json({ status: true, author });
  } catch (err) {
    console.log(err);
    return next(err)
  }
}

const deleteAuthor = async (req, res, next) => {
  const id = req.params.id
  try {
    await authorModel.deleteOne({ _id: id })
    return res.json({ status: true })
  }
  catch (err) {
    console.log(err);
    return next(err)
  }
}

const updateAuthor = async (req, res, next) => {
  const id = req.params.id
  try {
    const author = await authorModel.updateOne({ _id: id }, { $set: req.body }, { new: true })
    return res.json({ status: true, author })
  }
  catch (err) {
    console.log(err);
    return next(err)
  }

}

// const partialUpdateAuthor = async (req, res, next) => {
//   const id = req.params.id
//   try {
//     const Author = await authorModel.findOne({ _id: id });
//     for (const key in Author) {
//       if (key in req.body) {
//         Author[key] = req.body[key]
//       }
//     }
//     await AuthorModel.updateOne({ _id: id }, { $set: Author })
//     return res.json({ status: true })
//   }
//   catch (err) {
//     console.log(err);
//     return next(err)
//   }

// }

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  deleteAuthor,
  updateAuthor,
  // partialUpdateAuthor,
};