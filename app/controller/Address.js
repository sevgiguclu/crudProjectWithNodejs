const addressModel = require('../models/address');

//create address and save
exports.addressCreate = async function (req,res) {
    if(!req.body){
        res.send("error");
    }
    else {
        const address = new addressModel(req.body);
        await address.save();
        res.send("address saved");
    }
}

exports.findAllAddress = async function(req,res){
    const addresses = await addressModel.find();
    res.send(addresses);
}