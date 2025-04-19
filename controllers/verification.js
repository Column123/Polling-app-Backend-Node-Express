const User = require('../models/User');
const path = require('path');

const verification = async(req, res)=>{
    const incomingToken = req.params.token;
    const verifiedUser = await User.findOne({verificationToken: incomingToken}).exec();
    if(!verifiedUser){
        return res.sendStatus(404);  // verification token Expired
    }

    verifiedUser.isVerified = true;
    verifiedUser.verificationToken = '';
    const result = await verifiedUser.save();
    return res.status(200).sendFile(path.join(__dirname, '..', 'public', 'verify.html'))
}

module.exports = verification;