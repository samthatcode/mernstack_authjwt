const crypto = require("crypto");
const dotenv = require('dotenv');
dotenv.config();


// Function to generate a random token
const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString("hex");
};

// Get the token value from the environment variable or generate a new random token
const secretToken = process.env.TOKEN_KEY === undefined || process.env.TOKEN_KEY === ''
    ? generateRandomString(32)
    : process.env.TOKEN_KEY;

    console.log("Secret Token:", secretToken);

module.exports = {
    secretToken
};