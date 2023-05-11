const express=require('express');
const authorRouter=express.Router();

const authorController=require ('../../controllers/authors')


authorRouter.get('/',authorController.getAllauthors)

authorRouter.get('/:id',authorController.getauthorById)

authorRouter.post('/',authorController.createauthor)

authorRouter.delete('/:id',authorController.deleteauthor)

authorRouter.put('/:id',authorController.updateauthor)

authorRouter.patch('/:id',authorController.partialUpdateauthor)

module.exports = authorRouter