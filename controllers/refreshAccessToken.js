const User = require("../models/User");
const jwt = require("jsonwebtoken");

const refreshAccessToken = async (req, res) => {
    const abc = req.headers;
    console.log(abc);
    const cookie = req.cookies;
    if (!cookie?.jwt) {
        return res.sendStatus(401);  //error": "no cookie or jwt found
    }

    const refreshToken = cookie.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        return res.sendStatus(403);   //"error": "User a not found"
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) {
                return res.sendStatus(403);           //error": "User not found
            }
            const accessToken = jwt.sign(
                {
                    "username": foundUser.username,
                    "email": foundUser.email,
                    "_id": foundUser._id,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            res.json({ accessToken });
        }
    )
}

module.exports = refreshAccessToken;
