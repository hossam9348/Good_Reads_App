const mongoose=require('mongoose');
const authorSchema=mongoose.Schema({
    firstName:{type:String ,required:true},
    lastName:{type:String ,required:true},
    DOB:{type:mongoose.Schema.Types.Date},
    imgUrl:{type:String},
})

const authorModel=mongoose.model('author', authorSchema)

module.exports=authorModel