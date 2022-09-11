require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const logger = require('./logger/logger');
const routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(routes);
app.use((err, req, res, next) => {
    logger.error(err)
    res.send('Some error occured please try later');
    // next();
});
app.listen(PORT, (err) => {
    if (err) { throw err; }
    console.log(`Server started at port ${PORT}`)
});





