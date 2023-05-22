const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
    name: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'author', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
    imgUrl: { type: String, default: "/storage/default/user.png" },
    rating: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            rate: { type: Number, default: 0 }
        }
    ],
    rate: { type: Number, default: 0 }
})

// bookSchema.pre('findOneAndUpdate', function (next) {
//     const update = this.getUpdate();
//     if (update.$set.rating || update.$push.rating) {
//         const totalRatings = this._doc.rating.length + 1;
//         const sumRatings = this._doc.rating.reduce((acc, rating) => acc + rating.rate, 0) + update.$push.rating.rate;
//         const averageRating = sumRatings / totalRatings;
//         this.update({}, { $set: { rate:averageRating } });
//     }
//     next();
// });
const bookModel = mongoose.model('book', bookSchema)

module.exports = bookModel