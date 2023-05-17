require("dotenv").config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;
const TOKEN_KEY = process.env.TOKEN_KEY;


module.exports = {
    DB_URL,
    PORT,
    TOKEN_KEY,
}