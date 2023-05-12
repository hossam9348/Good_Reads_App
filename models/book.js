const mongoose=require('mongoose');
const bookSchema=mongoose.Schema({
    name:{type:String ,required:true},
    authorId:{type:mongoose.Schema.Types.ObjectId, ref: 'author' ,required:true},
    categoryId:{type:mongoose.Schema.Types.ObjectId, ref:'category', required:true},
    imgUrl:{type:String },
})

const bookModel=mongoose.model('book',bookSchema)

module.exports=bookModel