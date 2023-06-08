const bookRouter = require('express').Router();

const validateBook = require('../../middlewares/validateBook')
const validateImage = require('../../middlewares/validateImage')
const isAuthentucated = require('../../middlewares/isAuthentucated')
const isAdmin = require('../../middlewares/isAdmin')


const bookController = require('../../controllers/book')


bookRouter.get('/', isAuthentucated, bookController.getAllBooks)
bookRouter.get('/search', isAuthentucated, bookController.searchAllBooks)

bookRouter.get('/:id', isAuthentucated, bookController.getBookById)

bookRouter.post('/',
    isAuthentucated,
    isAdmin,
    validateImage,
    [
        validateBook.name(),
        validateBook.author(),
        validateBook.category(),
    ],
    bookController.createBook)

bookRouter.delete('/:id', isAuthentucated, isAdmin, bookController.deleteBook)
bookRouter.post('/:id/add-to-wish-list', isAuthentucated, bookController.addBookToWishList)

bookRouter.put('/:id',
    isAuthentucated,
    isAdmin,
    validateImage,
    [
        validateBook.name(),
        validateBook.author(),
        validateBook.category(),
    ],
    bookController.updateBook)

// bookRouter.patch('/:id', bookController.partialUpdateBook)

module.exports = bookRouter