const authorModel = require('../models/author');
const helpers = require("../utiles/helpers");

const getAllAuthors = async (req,res,next)=>{
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);
  const noOfItems = await helpers.getNoOfItems(authorModel);
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
    const authors = await authorModel
      .find({})
      .skip((page - 1) * limit)
      .limit(limit);
    return res.json({
      status: true,
      data: authors,
      totalPages,
    });
  } catch (err) {
    next (err);
  }
} 



const getAuthorById=async(req,res,next)=>{
  const id=req.params.id
  try {
      const Author=await authorModel.find({_id:id});
      return res.json({status:true,data:Author})
     }
     catch (err){
      console.log(err);
      return res.json(next)
     }
}

const createAuthor=async (req,res,next) => {
  try {
  const Authors= new authorModel(req.body)
  await Authors.save();
  return res.json({status:true,data:Authors});
  } catch (err) {
    console.log(err);
    return next(err)
  }
}

const deleteAuthor=async (req,res,next)=>{
  const id=req.params.id
  try{
      await authorModel.deleteOne({_id:id})
      return res.json({status:true})
  }
  catch(err){
    console.log(err);

    return next(err)
  }
}

const updateAuthor=async (req,res,next)=>{
  const id=req.params.id
  try{
      await authorModel.updateOne({_id:id},{$set :req.body})
      return res.json({status:true})
  }
  catch(err){
    console.log(err);

    return next(err)
  }

}

const partialUpdateAuthor=async (req,res,next)=>{
  const id=req.params.id
  try{
      const Author=await authorModel.findOne({_id:id});
      for (const key in Author) {
          if (key in req.body){
              Author[key]=req.body[key]
          }
      }
      await AuthorModel.updateOne({_id:id},{$set :Author})
      return res.json({status:true})
  }
  catch(err){
    console.log(err);
    return next(err)
  }

}

module.exports={
  getAllAuthors,
  getAuthorById,
  createAuthor,
  deleteAuthor,
  updateAuthor,
  partialUpdateAuthor,
};