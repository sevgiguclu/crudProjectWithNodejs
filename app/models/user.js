const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: String,
    value: String
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Companies' },
    address: [addressSchema],
    job: String
},
{ timestamps: true }
);

module.exports = mongoose.model('Users',userSchema);