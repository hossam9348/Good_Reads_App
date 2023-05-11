// const bookModel = require('../models/book');

// // All books
// const getAllbooks = async (req, res) => {
//     try {
//         const books = await bookModel.find();

//         return res.json(books);
//     } catch (error) {
//         res.status(400).json(error);

//     }
// }
// // one book
// const getOnebook = async (req, res) => {
//     id = req.params.id;

//     try {
//         const book = await bookModel.findById(id);

//         return res.json(book);
//     } catch (error) {
//         res.status(400).json(error);

//     }
// }



// // create book
// const createbook = async (req, res) => {
//     // console.log(Object.keys(req.body).length)
//     try {
//         if (!Object.keys(req.body).length) {
//             return res.status(400).json("fields are required");
//         }
//         const book = req.body
//         const savedbook = await bookModel.create(book);
//         return res.json(savedbook);

//     } catch (error) {

//         res.status(500).json(error);
//     }
// }

// const updatebook = async (req, res) => {
//     try {
//         if (!Object.keys(req.body).length) {
//             return res.status(400).json("fields are required");
//         }
//         id = req.params.id;
//         const book = req.body;
//         const updatedbook = await bookModel.updateOne({ _id: id }, book);
//         return res.json(updatedbook);

//     } catch (error) {

//         res.status(500).json(error);
//     }

// }
// const deletebook = async (req, res) => {
//     try {
//         id = req.params.id;
//         const book = await bookModel.findByIdAndDelete(id)
//         if (book) {
//             return res.json("deleted");
//         }
//         return res.status(404).json("not found");
//     }
//     catch (error) {
//         return res.status(404).json(error);
//     }
// }

// // comments of one book
// const getCommentsBybook = async (req, res) => {
//     id = req.params.id;

//     try {
//         const comments = await commentModel.find({ book: id });

//         return res.json(comments);
//     } catch (error) {
//         res.status(400).json(error);

//     }
// }

// module.exports = {
//     getAllbooks,
//     getOnebook,
//     createbook,
//     updatebook,
//     deletebook,
//     getCommentsBybook
// }