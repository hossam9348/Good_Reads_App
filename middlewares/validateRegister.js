const { body } = require('express-validator');
const userModel = require('../models/user');

const validateFirstName = () =>
    body("firstname").isString().isLength({ min: 3, max: 20 });

const validateLastName = () =>
    body("lastname").isString().isLength({ min: 3, max: 20 });

const validateEmail = () => body('email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false }).trim()
    .custom(
        (value, { req }) => {
            return userModel.findOne({ email: value })
                .then((user) => {
                    if (user) {
                        return Promise.reject("Email already exists!")
                    }
                })

        });

const validatePassword1 = () =>
    body('password1')
        .isStrongPassword();


const validatePassword2 = () =>
    body('password2')
        .exists({ checkFalsy: true })
        .withMessage('You must type a confirmation password')
        .custom((value, { req }) => value === req.body.password1)
        .withMessage("The passwords does not match");



module.exports =
{
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword1,
    validatePassword2
}




























// =========================================================
//          default options for isStrongPassword
// =========================================================
// body('password').isStrongPassword({
//     minLength: 8,
//     minLowercase: 1,
//     minUppercase: 1,
//     minNumbers: 1,
//     minSymbols: 1,
//     returnScore: false,
//     pointsPerUnique: 1,
//     pointsPerRepeat: 0.5,
//     pointsForContainingLower: 10,
//     pointsForContainingUpper: 10,
//     pointsForContainingNumber: 10,
//     pointsForContainingSymbol: 10,
// })