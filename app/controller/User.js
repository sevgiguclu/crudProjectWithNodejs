const userModel = require('../models/user');

// const { validationResult} = require('express-validator');

//create user and save
exports.userCreate = async function(req,res){
    
    // const errors = validationResult(req);
    // console.log('errors',errors);
    // res.send(errors);

    // if(errors.isEmpty()){

        // if(!req.body.name && !req.body.email){
        if(!req.body){
            res.send("error");
        }
        else {

            const user = new userModel(
                // {
                // name:req.body.name,
                // email:req.body.email,
                // age:req.body.age,
                // company:req.body.company,
                // address:req.body.address,
                // job:req.body.job
                // }
                req.body
            );

            const existing = await userModel.find({email:req.params.email});
            console.log(existing.length);
            if(existing.length !== 0){
                res.send("There is already a record with this email");
            }
            else{
                await user.save();
                // console.log(user.createdAt);
                // console.log(user.address);
                res.send("user create and save");
            }

            

        }
    // }

    
}

//find all user
exports.findAllUser = async function(req,res){
    const users = await userModel.find();
    res.send(users);
}

//find user by name
exports.findUserByName = async function(req,res){
    const user = await userModel.find({name:req.params.name});
    res.send(user);
}


//find user by id
exports.findUserById = async function (req,res) {
    // console.log(req.params);
    const user = await userModel.findById(req.params.id);
    if(user){
        res.send(user);
    }else{
        res.send("The user you were looking for was not found");
    }
    
}

//update user name
exports.updateUserValues = async function (req,res) {
    // console.log("params:");
    // console.log(req.params);
    // console.log("body:");
    // console.log(req.body);
    // const user = await userModel.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email});
    //önce find sonra update edilebilir
    const user = await userModel.findByIdAndUpdate(req.params.id,req.body);
    if(user){
        res.send("updated values ");
    }else{
        res.send("error");
    }
    
}

//delete user
exports.deleteUser = async function (req,res) {
    const user = await userModel.findByIdAndDelete(req.params.id);
    const userList = await userModel.find();
    if(user){
        res.send(userList);
    }
    else{
        res.send("error");
    }
        

}
