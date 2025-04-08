
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserRoute = require('./app/routes/User');
const CompanyRoute = require('./app/routes/Company');
const AddressRoute = require('./app/routes/Address');
const { query, validationResult } = require('express-validator');

const cors = require('cors')

const app = express();
app.use(express.json());

app.use(bodyParser.json());//bodyParser get body in post request
app.use(cors());//for Cors policy error
app.use('/users',UserRoute);
app.use('/companies',CompanyRoute);
app.use('/addresses',AddressRoute);

app.get('/',query('person').notEmpty(), (req,res) => {
    const result = validationResult(req);
    console.log("get ---");
    if (result.isEmpty()) {
        return res.send(`Hello, ${req.query.person}!`);
    }
    res.send({ errors: result.array() });
});

mongoose.connect('mongodb://localhost:27017/crudProject-nodejs');

app.listen(8000);

