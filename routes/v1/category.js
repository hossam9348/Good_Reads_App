const express = require('express');
const CategoryRouter = express.Router();
const { body } = require('express-validator')
const categoryController = require('../../controllers/category')
const isAuthentucated = require('../../middlewares/isAuthentucated')
const isAdmin = require('../../middlewares/isAdmin')

CategoryRouter.get('/dropdown', isAuthentucated, isAdmin, categoryController.getCategoryAuthor) //book dropdown


CategoryRouter.get('/:id', isAuthentucated, categoryController.getCategoryById)


CategoryRouter.get('/', isAuthentucated, categoryController.getAllCategories)

CategoryRouter.post('/',
    isAuthentucated,
    isAdmin,
    body('name').isString().isLength({ min: 3, max: 15 })
    , categoryController.createCategory)

CategoryRouter.delete('/:id', isAuthentucated, isAdmin, categoryController.deleteCategory)

CategoryRouter.put('/:id',
    isAuthentucated,
    isAdmin,
    body('name').isString().isLength({ min: 3, max: 15 }),
    categoryController.updateCategory)

// CategoryRouter.patch('/:id',categoryController.partialUpdateCategory)

module.exports = CategoryRouter