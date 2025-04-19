const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

const authenticate = async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.sendStatus(400);  // error = Invalid detail
    }

    const savedUser = await User.findOne({ email: email }).exec();
    if(!savedUser){
        return res.sendStatus(403); //error = User not Found
    }

    const passwordMatch = await bcrypt.compare(password, savedUser.password);

    if(!passwordMatch){
        return res.sendStatus(401);    //error: Wrong password
    }
    if(!savedUser.isVerified){
        return res.status(401).json({"error" : "Email is Not verified"});
    }
    
    const accessToken = jwt.sign({
            "username" : savedUser.username,
            "email" : savedUser.email,
            "_id" : savedUser._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
        {
            "email" : savedUser.email
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : "1d"
        }
    )
    savedUser.refreshToken = refreshToken;
    const result = await savedUser.save();

    res.cookie('jwt', refreshToken, {httpOnly:true, sameSite: 'None', secure: false, maxAge: 2*1000*60*60*24});
    return res.status(200).json({"accessToken": accessToken});
}

module.exports = authenticate;