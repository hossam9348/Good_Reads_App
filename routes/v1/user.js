const express=require('express');
const userRouter=express.Router();

const userController=require ('../../controllers/users')


userRouter.get('/',userController.getAllusers)

userRouter.get('/:id',userController.getuserById)

userRouter.post('/',userController.createuser)

userRouter.delete('/:id',userController.deleteuser)

userRouter.put('/:id',userController.updateuser)

userRouter.patch('/:id',userController.partialUpdateuser)

module.exports = userRouter