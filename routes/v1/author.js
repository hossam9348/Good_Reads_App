const express=require('express');
const authorRouter=express.Router();

const authorController=require ('../../controllers/author')


authorRouter.get('/',authorController.getAllAuthors)

authorRouter.get('/:id',authorController.getAuthorById)

authorRouter.post('/',authorController.createAuthor)

authorRouter.delete('/:id',authorController.deleteAuthor)

authorRouter.put('/:id',authorController.updateAuthor)

authorRouter.patch('/:id',authorController.partialUpdateAuthor)

module.exports = authorRouter