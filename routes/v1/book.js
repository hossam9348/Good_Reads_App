const express=require('express');
const bookRouter=express.Router();

const bookController=require ('../../controllers/books')


bookRouter.get('/',bookController.getAllbooks)

bookRouter.get('/:id',bookController.getbookById)

bookRouter.post('/',bookController.createbook)

bookRouter.delete('/:id',bookController.deletebook)

bookRouter.put('/:id',bookController.updatebook)

bookRouter.patch('/:id',bookController.partialUpdatebook)

module.exports = bookRouter