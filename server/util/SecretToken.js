const dotenv = require('dotenv');
const crypto = require("crypto");
dotenv.config();

// Function to generate a random token
const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString("hex");
};

// Get the token value from the environment variable or generate a new random token
const secretToken = process.env.TOKEN_KEY === undefined || process.env.TOKEN_KEY === ''
    ? generateRandomString(32)
    : process.env.TOKEN_KEY;

const jwt = require("jsonwebtoken");

// Use the secret token in your code
module.exports.createSecretToken = (id) => {
    return jwt.sign({ id }, secretToken, {
        expiresIn: 3 * 24 * 60 * 60,
    });
};
