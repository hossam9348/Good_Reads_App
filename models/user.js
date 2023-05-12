const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    firstName:{type:String ,required:true},
    lastName:{type:String ,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    imgUrl:{type:String },
    books:[{
        bookId:{type:mongoose.Schema.Types.ObjectId, ref:'book'}
        ,rate:{type:Number}
        ,status:{
            type:String,
            enum: ['want to read', 'read', 'reading'],
            default:'want to read'
        }
    }],
    role:{
        type: String,
        enum : ['user','admin'],
        default: 'user'
    }
})

const userModel=mongoose.model('user',userSchema)

module.exports=userModel