const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/EmailVerify");
const User = require("../models/User");
require("dotenv").config();

const createAccount = async(req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.sendStatus(400);
    }                                    // "error":"Invalid details"}
    const duplicateUser = await User.findOne({email: email}).exec();
    
    if(duplicateUser){
            return res.sendStatus(409); 
    }                                   //"error": "User already exist";
    try{
        const hashPassowrd = await bcrypt.hash(password, 10);
        const verficationToken = crypto.randomBytes(32).toString("hex");
        const url = `${process.env.BASE_URL}verify/${verficationToken}`;
        const text = `Click the Link below to verify your account\n\n${url}`;
        
        await sendEmail(email, "Email Verification", text);
        console.log("here");

        const result = await User.create({
            "username" : username,
            "email" : email,
            "password" : hashPassowrd,
            "verificationToken": verficationToken
        });
        return res.sendStatus(201);    //"message : PLease Verify your email"

    }catch(err){
        res.sendStatus(500);  //{error : serverError}
    }
}

module.exports = createAccount;
