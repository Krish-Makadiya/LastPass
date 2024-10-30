const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { nodeMailer } = require("../config/nodeMailer");
const crypto = require("crypto");

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } =
            req.body;

        // validating input
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        // Check if email is valid
        if (!validator.isEmail(email)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid email format" });
        }

        // check if password has 8 valid characters and not empty
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long",
            });
        }

        // check if confirmPassword matches password
        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({ success: false, message: "Passwords do not match" });
        }

        // check if email already exists in the database
        const isEmailPresent = await User.findOne({ email: email });
        if (isEmailPresent) {
            return res
                .status(400)
                .json({ success: false, message: "Email already exists" });
        }

        // hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user instance and save it to the database
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        return res.status(200).json({
            success: true,
            message: "Signed Up successfully. Please Login",
            data: user,
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        // validate input
        const { email, password } = req.body;

        // check if email and password are provided
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        // check if email is valid
        if (!validator.isEmail(email)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid email format" });
        }

        // check if user exists in the database and if the password matches
        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "User not found" });
        }

        // compare the hashed password with the stored password in the database
        const hashedPassword = await bcrypt.compare(password, user.password);
        if (!hashedPassword) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid password" });
        }

        // generate a JWT token for the user
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        user.token = token;
        // user.password = undefined;

        const options = {
            expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        };

        // return the JWT token to the user
        return res.status(200).cookie("token", token, options).json({
            success: true,
            message: "Logged in successfully",
            token: token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Login error" });
    }
};

exports.logout = async (req, res) => {
    try {
        req.user.token = undefined;
        await req.user.save();

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Logout error" });
    }
};

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(401).json({
                success: false,
                message: "Email is required",
            });
        }

        if (!validator.isEmail(email)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Account not found",
            });
        }

        const token = crypto.randomUUID();
        await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 10 * 60 * 1000,
            },
            { new: true }
        );

        const url = `${process.env.FRONTEND_URL}/update-password/${token}`;

        await nodeMailer(email, "Password Reset Link", url);

        return res.status(200).json({
            success: true,
            message: "Email sent successfully",
            token: token,
        });
    } catch (error) {
        console.log(`ERROR: ${error}`);
        res.status(401).json({
            success: false,
            message: `PASSWORD RESET ISSUE: ${error.message}`,
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (!password || !confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Please enter all the fields",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long",
            });
        }

        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({ success: false, message: "Passwords do not match" });
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found while reseting the password",
            });
        }

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found for given token",
            });
        }

        if (user.resetPasswordExpires < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "Update Link expired. Please try again",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate(
            { token },
            {
                password: hashedPassword,
                // token: null,
                // resetPasswordExpires: null,
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Password Updated successfull",
        });
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return res.json({
            success: false,
            message: `ERROR MESSAGE || DURING RESET PASSWORD: ${error.message}`,
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Return a success response
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting account:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
