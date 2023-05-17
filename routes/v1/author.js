const authorRouter = require('express').Router();

const authorController = require('../../controllers/author')
const isAuthentucated = require('../../middlewares/isAuthentucated')
const isAdmin = require('../../middlewares/isAdmin')
const validateImage = require('../../middlewares/validateImage')
const {
    validateFirstName,
    validateLastName,
    validateDate

} = require('../../middlewares/validateRegister')


authorRouter.post('/',
    isAuthentucated,
    isAdmin,
    validateImage,
    [
        validateFirstName(),
        validateLastName,
        validateDate()
    ], authorController.createAuthor)

authorRouter.get('/', isAuthentucated, authorController.getAllAuthors)

authorRouter.get('/:id', isAuthentucated, authorController.getAuthorById)


authorRouter.delete('/:id', isAuthentucated, isAdmin, authorController.deleteAuthor)

authorRouter.put('/:id',
    isAuthentucated,
    isAdmin,
    validateImage,
    [
        validateFirstName(),
        validateLastName,
        validateDate()
    ], authorController.updateAuthor)

// authorRouter.patch('/:id', authorController.partialUpdateAuthor)

module.exports = authorRouter