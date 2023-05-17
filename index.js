const express = require('express');
const cors = require('cors');

const db = require("./database/db");
const PORT = require('./config/config').PORT || 5000;
const v1Router = require('./routes/v1/index');


//  express app
const app = express();

// middlewares
app.use(cors({
    origin: ['http://localhost:3000']
}));
app.use(express.json())

// db connection
db();

// routes
app.use('/api', v1Router);
app.use('/', (req, res) => {
    return res.send({ "message": "Hello, World!" })
});

// error
app.use((error, req, res, next) => {
    return res
        .status(error.status || 400)
        .send({ message: error.message || error.array || error });

})

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT} .....`)
})
