const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const secretToken = require("../util/tokenUtils").secretToken;


module.exports.userVerification = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ status: false });
    }

    jwt.verify(token, secretToken, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            const user = await User.findById(data.id);
            if (user) {
                return res.json({ status: true, user: user.username });
            } else {
                return res.json({ status: false });
            }
        }
    });
};
