const booksModel = require('../models/book');

const getAllBooks = async ()=>{
  try{
    const books = await booksModel.find({});
    return res.json(books)
    }
    catch(err){
      return res.json({status:false})
    }
} 

const getBookById=async(req,res)=>{
  const id=req.params.id
  try {
      const books=await booksModel.find({_id:id});
      return res.json(books)
    }
    catch (err){
      return res.json({status:false})
    }
}

const createBook=async (req, res) => {
  try {
  const books= new booksModel(req.body)
  await books.save();
  return res.json(books);
  } catch (err) {
    return res.json({status:false})
  }
}

const deleteBook=async (req,res)=>{
  const id=req.params.id
  try{
      await booksModel.deleteOne({_id:id})
      return res.json({status:true})
  }
  catch(err){
      return res.json({status:false})
  }
}

const updateBook=async (req,res)=>{
  const id=req.params.id
  try{
      await booksModel.updateOne({_id:id},{$set :req.body})
      return res.json({status:true})
  }
  catch(err){
    return res.json({status:false})
  }

}

const partialUpdateBook=async (req,res)=>{
  const id=req.params.id
  try{
      const books=await booksModel.findOne({_id:id});
      for (const key in books) {
          if (key in req.body){
              books[key]=req.body[key]
          }
      }
      await booksModel.updateOne({_id:id},{$set :books})
      return res.json({status:true})
  }
  catch(err){
    return res.json({status:false})
  }

}

module.exports={
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
  partialUpdateBook,
};