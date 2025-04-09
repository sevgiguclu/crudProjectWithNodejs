const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type:String, unique:true},
    password: { type: String, required:true},
    age: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Companies' },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'userAddress' },
    job: String
},
{ timestamps: true }
);

module.exports = mongoose.model('Users',userSchema);