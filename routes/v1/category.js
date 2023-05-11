const express=require('express');
const categoryRouter=express.Router();

const categoryController=require ('../../controllers/categorys')


categoryRouter.get('/',categoryController.getAllcategorys)

categoryRouter.get('/:id',categoryController.getcategoryById)

categoryRouter.post('/',categoryController.createcategory)

categoryRouter.delete('/:id',categoryController.deletecategory)

categoryRouter.put('/:id',categoryController.updatecategory)

categoryRouter.patch('/:id',categoryController.partialUpdatecategory)

module.exports = categoryRouter