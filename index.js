
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserRoute = require('./app/routes/User');
const CompanyRoute = require('./app/routes/Company');

const cors = require('cors')

const app = express();

app.use(bodyParser.json());//bodyParser get body in post request
app.use(cors());//for Cors policy error
app.use('/users',UserRoute);
app.use('/companies',CompanyRoute);

app.get('/', (req,res) => {
    console.log("get ---");
    res.send("hello my friend");
});

mongoose.connect('mongodb://localhost:27017/crudProject-nodejs');

app.listen(8000);

