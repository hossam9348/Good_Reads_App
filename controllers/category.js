
const categoryModel = require('../models/category');
const authorModel = require('../models/author');

const bookModel = require('../models/book')

const helpers = require("../utiles/helpers");

const getAllCategories = async (req,res,next)=>{
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);
  const noOfItems = await helpers.getNoOfItems(categoryModel);
  if (page <= 0) {
    page = 1;
  }
  if (limit > noOfItems) {
    limit = noOfItems;
  }
  if (!page){
    page=1
  }
  if(!limit){
    limit=5
  }
  const totalPages = Math.ceil(noOfItems / limit);
  if (page > totalPages) {
    page = totalPages;
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
    return next(err);
  }
} 

const getCategoryById=async(req,res,next)=>{
  const id=req.params.id
  try {
      const category = await categoryModel.find({_id:id});
      return res.json({status:true,data:category})
    }
    catch (err){
      return next(err)
    }
}

const createCategory=async (req, res) => {
  try {
  const category= new categoryModel(req.body)
  await category.save();
  return res.json({status:true,data:category});
  } catch (err) {
    return next(err)
  }
}

const deleteCategory=async (req,res)=>{
  const id=req.params.id
  try{
      await categoryModel.deleteOne({_id:id})
      return res.json({status:true})
  }
  catch(err){
      return next(err)
  }
}

const updateCategory=async (req,res)=>{
  const id=req.params.id
  try{
      await categoryModel.updateOne({_id:id},{$set :req.body})
      return res.json({status:true})
  }
  catch(err){
    return next(err)
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
    return next(err)
  }

}

const getCategoryAuthor = async (req,res)=>{
  try {
    const categories = await categoryModel
      .find({},{name:1})
    const authors = await authorModel
      .find({},{firstName:1,lastName:1})
    return res.json({
      status: true,
      data: {categories,authors},
    });
  } catch (err) {
    next(err);
  }
}

const getBooksByCategory = () =>{} 

module.exports={
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
  partialUpdateCategory,
  getCategoryAuthor,
};