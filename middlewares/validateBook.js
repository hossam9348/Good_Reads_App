const { body } = require('express-validator');

const name = () => body('name')
    .isString()
    .isLength({ min: 3, max: 25 })
    .trim();

const author = () => body('author').isMongoId()
const category = () => body('category').isMongoId()


const validateBook={name,author,category}
module.exports =validateBook