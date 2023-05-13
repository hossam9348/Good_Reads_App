const express=require('express');
const CategoryRouter=express.Router();

const categoryController=require ('../../controllers/category')


CategoryRouter.get('/dropdown',categoryController.getCategoryAuthor)


CategoryRouter.get('/:id',categoryController.getCategoryById)


// CategoryRouter.get('/books',categoryController.getAllBooks)

CategoryRouter.get('/',categoryController.getAllCategories)

CategoryRouter.post('/',categoryController.createCategory)

CategoryRouter.delete('/:id',categoryController.deleteCategory)

CategoryRouter.put('/:id',categoryController.updateCategory)

CategoryRouter.patch('/:id',categoryController.partialUpdateCategory)

module.exports = CategoryRouter