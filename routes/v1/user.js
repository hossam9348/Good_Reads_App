const express=require('express');
const userRouter=express.Router();

const userController=require ('../../controllers/user')


userRouter.get('/',userController.getAllUsers)

userRouter.get('/:id',userController.getUserById)

userRouter.post('/',userController.createUser)

userRouter.delete('/:id',userController.deleteUser)

userRouter.put('/:id',userController.updateUser)

userRouter.patch('/:id',userController.partialUpdateUser)

module.exports = userRouter