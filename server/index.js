require('dotenv').config()
const express = require('express')
const formData = require('express-form-data')
const app = express()
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;
  
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Max-Age", 3600);

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.status(200).end();
    }
    else {
        //move on
        next();
    }
});

app.use(formData.parse())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
