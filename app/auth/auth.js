const jwt = require('jsonwebtoken');

module.exports = {
    authMiddleware : (req,res,next) => {

        // console.log("headers: ",req.headers['postman-token']);
        // console.log("headers: ",req.headers.authorization);
        const token = req.headers.authorization;
        // console.log("TOKEN",token);
        if(!token){
            res.send('Authentication failed');
        }
        jwt.verify(token,process.env.JWT_ACCESS_TOKEN,function(err, decoded){
            if(err)
                res.send(err);
            console.log("decoded",decoded);
            
            if(req.body.email == decoded.email && req.body.password == decoded.password)
                next();
            else
                res.send('Authentication failed');
        });
        
    }
}