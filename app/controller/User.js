const userModel = require('../models/user');


//create user and save
exports.userCreate = function(req,res){
    
    if(!req.body.name && !req.body.email){
        res.send("error");
    }

    const user = new userModel({
        name:req.body.name,
        email:req.body.email
    });

    user.save();
    res.send("user create and save");
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
    res.send(user);
}

//update user name
exports.updateUserName = async function (req,res) {
    // console.log("params:");
    // console.log(req.params);
    // console.log("body:");
    // console.log(req.body);
    const user = await userModel.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email});
    if(user){
        res.send("updated name");
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