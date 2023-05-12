const usersModel = require('../models/user');

const getAllUsers = async (req,res)=>{
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);
  const noOfItems = await helpers.getNoOfItems(booksModel);
  const totalPages = Math.ceil(noOfItems / limit);
  if (page > totalPages) {
    page = totalPages;
  }
  if (page <= 0) {
    page = 1;
  }
  if (limit > noOfItems) {
    limit = noOfItems;
  }
  try {
    const categories = await categoryModel
      .find({})
      .skip((page - 1) * limit)
      .limit(limit);
    return res.json({
      status: true,
      data: categories,
      totalPages,
    });
  } catch (err) {
    return res.json({ status: false });
  }
} 

const getUserById=async(req,res)=>{
  const id=req.params.id
  try {
      const User=await usersModel.find({_id:id});
      return res.json({status:true,data:User})
    }
    catch (err){
      return res.json({status:false})
    }
}

const createUser=async (req, res) => {
  try {
  const User= new usersModel(req.body)
  await User.save();
  return res.json({status:true,data:User});
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