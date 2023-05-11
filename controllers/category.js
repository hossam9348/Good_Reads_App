
const categoryModel = require('../models/category');

const getAllCategories = async ()=>{
  try{
    const categories = await categoryModel.find({});
    return res.json(categories)
    }
    catch(err){
      return res.json({status:false})
    }
} 

const getCategoryById=async(req,res)=>{
  const id=req.params.id
  try {
      const category = await categoryModel.find({_id:id});
      return res.json(category)
    }
    catch (err){
      return res.json({status:false})
    }
}

const createCategory=async (req, res) => {
  try {
  const category= new categoryModel(req.body)
  await category.save();
  return res.json(category);
  } catch (err) {
    return res.json({status:false})
  }
}

const deleteCategory=async (req,res)=>{
  const id=req.params.id
  try{
      await categoryModel.deleteOne({_id:id})
      return res.json({status:true})
  }
  catch(err){
      return res.json({status:false})
  }
}

const updateCategory=async (req,res)=>{
  const id=req.params.id
  try{
      await categoryModel.updateOne({_id:id},{$set :req.body})
      return res.json({status:true})
  }
  catch(err){
    return res.json({status:false})
  }

}

const partialUpdateCategory=async (req,res)=>{
  const id=req.params.id
  try{
      const category=await categoryModel.findOne({_id:id});
      for (const key in category) {
          if (key in req.body){
              category[key]=req.body[key]
          }
      }
      await categoryModel.updateOne({_id:id},{$set :category})
      return res.json({status:true})
  }
  catch(err){
    return res.json({status:false})
  }

}

module.exports={
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
  partialUpdateCategory,
};