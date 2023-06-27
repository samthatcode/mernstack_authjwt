const jwt = require("jsonwebtoken");
const secretToken = require("./tokenUtils").secretToken;

// Use the secret token in your code
module.exports.createSecretToken = (id) => {
    const expiresIn = "24h"; // Expiration time set to 24 hours
    return jwt.sign({ id }, secretToken, { expiresIn });
};
