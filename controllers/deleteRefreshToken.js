const User = require("../models/User");

const deleteRefreshToken = async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.jwt) {
        return res.sendStatus(204);
    }
    const refreshToken = cookie.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    foundUser.refreshToken = "";
    const result = await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(200);     //"message": "User successfully logged out"
}

module.exports = deleteRefreshToken;