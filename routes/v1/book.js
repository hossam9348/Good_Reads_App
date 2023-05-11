const express=require('express');
const bookRouter=express.Router();

const bookController=require ('../../controllers/book')


bookRouter.get('/',bookController.getAllBooks)

bookRouter.get('/:id',bookController.getBookById)

bookRouter.post('/',bookController.createBook)

bookRouter.delete('/:id',bookController.deleteBook)

bookRouter.put('/:id',bookController.updateBook)

bookRouter.patch('/:id',bookController.partialUpdateBook)

module.exports = bookRouter