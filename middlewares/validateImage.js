const multer = require("multer");


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log('des : ', req.body)
        cb(null, 'storage/images/')

    }, filename: (req, file, cb) => {
        file.originalname = file.originalname.replace(/ /g, "_");
        cb(null, `${Math.floor(new Date() / 1000)}_${file.originalname}`)
    }
});

const validImageType = ['image/png', 'image/jpg', 'image/jpeg']
const maxSize = 1 * 1024 * 1024;

const myfileFilter = (req, file, cb) => {

    if (validImageType.includes(file.mimetype)) {
        cb(null, true)
    } else {

        const error = new Error("image not valid - accept only  [image/png, image/jpg, image/jpeg]");
        error.status = 400
        cb(error, false)
    }
}
const validateImage = multer(
    { fileFilter: myfileFilter, storage: fileStorage, limits: { fileSize: maxSize } })
    .single("image")


module.exports = validateImage
