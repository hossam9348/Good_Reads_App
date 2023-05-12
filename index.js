const express = require('express');
require("dotenv").config();
const db = require("./config/db");
const app = express();

// const bodyParser = require('body-parser');


const v1Router = require('./routes/v1/index');
const PORT = process.env.PORT || 3000;

app.use(express.json())

const mongoose=require('mongoose');
mongoose.connect(process.env.DB_URL).catch((err)=>{console.log(err);});

// db connection


//  middlewares


// routes
app.use('/api', v1Router);
app.use('/', (req, res) => {
    res.send({ "message": "Hello, World!" })
});

app.use((error, req, res, next) => {
    res.status(error.status || 400).send({ message: error.message || error });
    // next()
})

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT} .....`)
})