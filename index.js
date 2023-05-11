require("dotenv").config();
const db = require("./config/db");
const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');


const v1Router = require('./routes/v1/index');
const PORT = process.env.PORT || 3000;


const app = express();
// db connection
db();

//  middlewares
app.use(express.json());


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