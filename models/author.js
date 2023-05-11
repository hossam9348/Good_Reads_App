const mongoose=require('mongoose');
const authorSchema=mongoose.Schema({
    firstName:{type:String ,required:true},
    firstname:{type:String ,required:true},
    DOB:{type:mongoose.Schema.Types.Date ,required:true},
    imgUrl:{type:String ,required:true},
})

const authorModel=mongoose.model('author', authorSchema)

module.exports=authorModel