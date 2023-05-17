const mongoose = require('mongoose');
const authorSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    DOB: {
        type: mongoose.Schema.Types.Date
    },
    imgUrl: {
        type: String,
        default: "/storage/default/user.png"
    },
})

const authorModel = mongoose.model('author', authorSchema)

module.exports = authorModel