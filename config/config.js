require("dotenv").config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;
const TOKEN_KEY = process.env.TOKEN_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;


module.exports = {
    DB_URL,
    PORT,
    TOKEN_KEY,
    FRONTEND_URL,
}