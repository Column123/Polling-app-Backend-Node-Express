const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')){
        res.status(401).json({'error': 'No token provided'});
        return;
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded)=>{
            if(err){
                res.status(403).json({'error': 'invalid token'});
                return;
            }
            req.user = decoded;
            next();
        }
    )

}

module.exports = verifyJWT;