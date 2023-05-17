const jwt = require('jsonwebtoken');
const TOKEN_KEY = require('../config/config').TOKEN_KEY;

const signAccessToken = (user) => {
    const token = jwt.sign(
        {
            user_id: user._id,
            email: user.email,
            isEmailVerified: user.isEmailVerified
        },
        TOKEN_KEY,
        {
            expiresIn: "8h",
        }
    );
    return token
}

module.exports = signAccessToken