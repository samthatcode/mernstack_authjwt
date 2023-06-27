const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const tokenBlacklist = new Set(); // Create the token blacklist set

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;
        const existingUser = await User.findOne({ email });

        // check if user alredy exist
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // create the new user
        const user = await User.create({ email, password, username, createdAt });

        const token = createSecretToken(user._id);
        console.log("Generated Token:", token); // Log the generated token

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(201).json({ message: "User signed up successfully", success: true, user });
        next();
    } catch (error) {
        console.error(error);
        next(error); // Pass the error to the error-handling middleware
    }
};


module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Incorrect password or email" });
        }

        const auth = await bcrypt.compare(password, user.password);

        if (!auth) {
            return res.status(400).json({ message: "Incorrect or password mismatch" });
        }

        const token = createSecretToken(user._id);
        console.log("Generated Token:", token); // Log the generated token

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({ message: "User logged in successfully", success: true, email, token });
        next()
    } catch (error) {
        console.error(error);
        next(error); // Pass the error to the error-handling middleware
    }
}

module.exports.Logout = (req, res) => {
    const token = req.cookies.token;
    if (token) {
        // Add the token to the blacklist
        tokenBlacklist.add(token);
    }
    res.clearCookie("token").json({ message: "Logged out successfully" });
};