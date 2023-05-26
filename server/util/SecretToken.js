const jwt = require("jsonwebtoken");
const secretToken = require("./tokenUtils").secretToken;

// Use the secret token in your code
module.exports.createSecretToken = (id) => {
    return jwt.sign({ id }, secretToken, {
        expiresIn: 3 * 24 * 60 * 60,
    });
};
