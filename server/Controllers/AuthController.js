const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;
        const existingUser = await User.findOne({ email });

        // check if user alredy exist
        if (existingUser) {
            return res.status(200).json({ message: "User already exists" });
        }

        // create the new user
        const user = await User.create({ email, password, username, createdAt });

        const token = createSecretToken(user._id);
        console.log("Generated Token:", token); // Log the generated token
        
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User signed up successfully", success: true, user });
        next();
    } catch (error) {
        console.error(error);
    }
};


module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'All fields are required' })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: 'Incorrect password or email' })
        }

        const auth = await bcrypt.compare(password, user.password);

        if (!auth) {
            return res.json({ message: 'Incorrect password or email' })
        }

        const token = createSecretToken(user._id);
        console.log("Generated Token:", token); // Log the generated token

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(200).json({ message: "User logged in successfully", success: true });
        next()
    } catch (error) {
        console.error(error);
    }
}