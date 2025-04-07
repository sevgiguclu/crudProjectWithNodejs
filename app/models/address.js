const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: String,
    value: String,
    city: String
},
{ timestamps: true }
);

module.exports = mongoose.model('userAddress',addressSchema);


