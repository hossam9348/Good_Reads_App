const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{type:String ,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref: 'user' ,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    imgUrl:{type:String ,required:true},
})

const userModel=mongoose.model('user',userSchema)

module.exports=userModel