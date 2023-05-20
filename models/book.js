const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
    name: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'author', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
    imgUrl: { type: String },
    rating: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            rate: { type: Number }
        }
    ]
})

const bookModel = mongoose.model('book', bookSchema)

module.exports = bookModel