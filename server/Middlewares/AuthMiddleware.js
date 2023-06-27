const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const secretToken = require("../util/tokenUtils").secretToken;

// Example implementation of token blacklist
const tokenBlacklist = new Set();

// verify user's token and return user information if token is valid.
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
                return res.json({ status: true, user: user.email });
            } else {
                return res.json({ status: false });
            }
        }
    });
};



// Middleware to check if token is valid and not blacklisted
module.exports.tokenVerification = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if token is blacklisted
    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ message: "Token is no longer valid" });
    }

    jwt.verify(token, secretToken, (err, data) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        } else {
            req.userId = data.id; // Set the user ID from the token
            next();
        }
    });
};