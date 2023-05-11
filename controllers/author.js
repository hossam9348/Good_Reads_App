const authorModel=require('../models/author');

const getAllAuthors = async ()=>{
  try{
    const authors=await authorModel.find({});
    return res.json(authors)
    }
    catch(err){
      return res.json({status:false})
    }
} 



const getAuthorById=async(req,res)=>{
  const id=req.params.id
  try {
      const Author=await AuthorModel.find({_id:id});
      return res.json(Author)
     }
     catch (err){
      return res.json({status:false})
     }
}

const createAuthor=async (req, res) => {
  try {
  const Authors= new AuthorModel(req.body)
  await Authors.save();
  return res.json(Authors);
  } catch (err) {
    return res.json({status:false})
  }
}

const deleteAuthor=async (req,res)=>{
  const id=req.params.id
  try{
      await AuthorModel.deleteOne({_id:id})
      return res.json({status:true})
  }
  catch(err){
      return res.json({status:false})
  }
}

const updateAuthor=async (req,res)=>{
  const id=req.params.id
  try{
      await AuthorModel.updateOne({_id:id},{$set :req.body})
      return res.json({status:true})
  }
  catch(err){
    return res.json({status:false})
  }

}

const partialUpdateAuthor=async (req,res)=>{
  const id=req.params.id
  try{
      const Author=await AuthorModel.findOne({_id:id});
      for (const key in Author) {
          if (key in req.body){
              Author[key]=req.body[key]
          }
      }
      await AuthorModel.updateOne({_id:id},{$set :Author})
      return res.json({status:true})
  }
  catch(err){
    return res.json({status:false})
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