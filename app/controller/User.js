const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { validationResult} = require('express-validator');

//create user, hash user password and save
exports.userCreate = async function(req,res){
    
    // const errors = validationResult(req);
    // if(errors.isEmpty()){

        // if(!req.body.name && !req.body.email){
        if(!req.body){
            res.status(400).send("error");
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

            const existing = await userModel.find({email:req.body.email});
            if(existing.length !== 0){
                res.send("There is already a record with this email");
            }
            else{
                //hash password
                // var salt = bcrypt.genSalt(10);
                // console.log(typeof(salt));
                // const hashedPassword = await bcrypt.hash(req.body.password,salt);
                // console.log("hashedPass: ",hashedPassword);
                // user.password = hashedPassword;

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, async function(err, hash) {
                        // Store hash in your password DB.
                        user.password = hash;
                        await user.save();
                        res.status(200).send("user create and save");
                    });
                });
            }

            

        }

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
        user.password = undefined;
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
        res.send("not deleted person");
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

exports.userLogin = async function(req,res){
    // dotenv.config();
    // console.log("env",process.env);

    const findUser = await userModel.findOne({email:req.body.email});
    if(findUser){
        const isMatch = await bcrypt.compareSync(req.body.password,findUser.password);
        if(isMatch){
            const accessToken = jwt.sign({email:findUser.email,password:req.body.password},process.env.JWT_ACCESS_TOKEN,{expiresIn:'1h'});
            const refreshToken = jwt.sign({email:findUser.email,password:req.body.password},process.env.JWT_REFRESH_TOKEN,{expiresIn:'1h'});
            
            findUser.password = undefined;
            res.send({
                success: true,
                message:"login succesfully",
                accessToken,
                refreshToken,
                findUser
            });
        }
        else{
            res.send("not login");
        }
    }
    else {
        res.send("email not saved");
    }

    // console.log(findUser);
    // console.log(isMatch);
    // console.log(findUser.length);
    
};

exports.refreshToken = async function(req,res){
    const {refreshToken} = req.body;
    if(!refreshToken) return res.sendStatus(401);
    jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN,function(err, decoded){
        if(err)
            res.status(400).send(err);
        console.log("decoded",decoded);
        
        const accessToken = jwt.sign({email:decoded.email,password:decoded.password},process.env.JWT_ACCESS_TOKEN,{expiresIn:'1h'});
        const refreshToken = jwt.sign({email:decoded.email,password:decoded.password},process.env.JWT_REFRESH_TOKEN,{expiresIn:'1h'});

        return res.status(200).send({
            success: true,
            message:"refreshed token succesfully",
            accessToken,
            refreshToken
        });
    });

}

