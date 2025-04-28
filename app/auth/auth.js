const jwt = require('jsonwebtoken');

module.exports = {
    authMiddleware : (req,res,next) => {

        // console.log("headers: ",req.headers['postman-token']);
        // console.log("headers: ",req.headers.authorization);
        const token = req.headers.authorization;
        console.log("TOKEN",token);
        if(!token){
            res.status(401).send('Authentication failed');
        }
        jwt.verify(token,process.env.MY_ACCESS_TOKEN,function(err,decoded){
            console.log("decoded",decoded);
            // console.log("Authentication err : ",err);
            if(decoded){
                if(req.body.email && req.body.password){
                    console.log("body var",req.body);
                    if(req.body.email == decoded.email && req.body.password == decoded.password)
                        next();
                    else
                        res.status(401).send({'message':'Authentication failed'});
                }else{
                    console.log("body yok");
                    next();
                }
                
            }else{
                res.status(401).send('Authentication failed');
            }
            
            
        });
        
    }
}