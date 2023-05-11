const usersModel = require('../models/user');

const getAllUsers = async ()=>{
  try{
    const User = await usersModel.find({});
    return res.json(User)
    }
    catch(err){
      return res.json({status:false})
    }
} 

const getUserById=async(req,res)=>{
  const id=req.params.id
  try {
      const User=await usersModel.find({_id:id});
      return res.json(User)
    }
    catch (err){
      return res.json({status:false})
    }
}

const createUser=async (req, res) => {
  try {
  const User= new usersModel(req.body)
  await User.save();
  return res.json(User);
  } catch (err) {
    return res.json({status:false})
  }
}

const deleteUser=async (req,res)=>{
  const id=req.params.id
  try{
      await usersModel.deleteOne({_id:id})
      return res.json({status:true})
  }
  catch(err){
      return res.json({status:false})
  }
}

const updateUser=async (req,res)=>{
  const id=req.params.id
  try{
      await usersModel.updateOne({_id:id},{$set :req.body})
      return res.json({status:true})
  }
  catch(err){
    return res.json({status:false})
  }

}

const partialUpdateUser=async (req,res)=>{
  const id=req.params.id
  try{
      const User=await usersModel.findOne({_id:id});
      for (const key in User) {
          if (key in req.body){
              User[key]=req.body[key]
          }
      }
      await usersModel.updateOne({_id:id},{$set :User})
      return res.json({status:true})
  }
  catch(err){
    return res.json({status:false})
  }

}

module.exports={
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  partialUpdateUser,
};