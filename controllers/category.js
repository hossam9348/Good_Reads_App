
const categoryModel = require('../models/category');
const helpers = require("../utiles/helpers");

const getAllCategories = async (req,res)=>{
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);
  const noOfItems = await helpers.getNoOfItems(categoryModel);
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

const getCategoryById=async(req,res)=>{
  const id=req.params.id
  try {
      const category = await categoryModel.find({_id:id});
      return res.json({status:true,data:category})
    }
    catch (err){
      return res.json({status:false})
    }
}

const createCategory=async (req, res) => {
  try {
  const category= new categoryModel(req.body)
  await category.save();
  return res.json({status:true,data:category});
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