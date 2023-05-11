const express=require('express');
const CategoryRouter=express.Router();

const categoryController=require ('../../controllers/category')


CategoryRouter.get('/',categoryController.createCategory)

CategoryRouter.get('/:id',categoryController.getCategoryById)

CategoryRouter.post('/',categoryController.createCategory)

CategoryRouter.delete('/:id',categoryController.deleteCategory)

CategoryRouter.put('/:id',categoryController.updateCategory)

CategoryRouter.patch('/:id',categoryController.partialUpdateCategory)

module.exports = CategoryRouter