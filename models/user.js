

const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default:"/storage/default/user.png"
    },
    books: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId, ref: 'book'
            }
            , rate: { type: Number, min: 0, max: 5,default:0 }
            , status: {
                type: String,
                enum: ['want to read', 'read', 'reading'],
                default: 'want to read'
            }
        }
    ],
    role:{

        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel