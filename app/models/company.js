const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
        name:String,
        personelNumber:Number
    },
    { timestamps: true }
);

module.exports = mongoose.model('Companies',companySchema);