const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    firstName:{type:String ,required:true},
    lastName:{type:String ,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    imgUrl:{type:String ,required:true},
    books:[{
        bookId:{type:mongoose.Schema.Types.ObjectId, ref:'category'}
        ,rate:{type:Number}
        ,status:{enum: ['want to read', 'read', 'reading']}
    }],
    role:{enum:['user','admin']}
})

const userModel=mongoose.model('user',userSchema)

module.exports=userModel