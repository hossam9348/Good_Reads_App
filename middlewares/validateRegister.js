const { body } = require('express-validator');
const userModel = require('../models/user');

const FirstName = () =>
    body("firstname").isString().isLength({ min: 3, max: 20 });

const LastName = () =>
    body("lastname").isString().isLength({ min: 3, max: 20 });

const Email = () => body('email')
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

const Password1 = () =>
    body('password1')
        .isStrongPassword();


const Password2 = () =>
    body('password2')
        .exists({ checkFalsy: true })
        .withMessage('You must type a confirmation password')
        .custom((value, { req }) => value === req.body.password1)
        .withMessage("The passwords does not match");


const Date=()=>body('date_of_birth').isDate()

const validateRegister={FirstName,LastName,Email,Password1,Password2,Date}
module.exports = validateRegister





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