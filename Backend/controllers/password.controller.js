const Password = require("../models/Password.model");
const User = require("../models/User.model");

exports.addPassword = async (req, res) => {
    try {
        const { linkName, linkUrl, username, password } = req.body;
        const userId = req.user._id;

        if (!linkName || !linkUrl || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }
    
        const newPassword = await Password.create({
            linkName,
            linkUrl,
            username,
            password,
        });

        await User.findByIdAndUpdate(
            { _id: userId },
            {
                $push: {
                    savedPasswords: newPassword,
                },
            }
        )
            .populate("savedPasswords")
            .exec();

        return res.status(200).json({
            success: true,
            message: "password added successfully",
            data: newPassword,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Password update failed" });
    }
};

exports.editPassword = async (req, res) => {
    try {
        const {
            newLinkName,
            newLinkUrl,
            newUsername,
            newPassword,
            passwordId,
        } = req.body;
        const userId = req.user._id;

        if (!newLinkName || !newLinkUrl || !newUsername || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        const response = await Password.findByIdAndUpdate(
            passwordId,
            {
                linkName: newLinkName,
                linkUrl: newLinkUrl,
                username: newUsername,
                password: newPassword,
            },
            { new: true }
        );

        const userData = await User.findById({ _id: userId })
            .populate("savedPasswords")
            .exec();

        return res.status(200).json({
            success: true,
            message: "password updated successfully",
            data: response,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Password update failed" });
    }
};

exports.deletePassword = async (req, res) => {
    try {
        // Get the password from the body
        const { passwordId } = req.body;
        const userId = req.user._id;

        // Delete the password
        const response = await Password.findByIdAndDelete(passwordId);

        // Remove the password from the user's savedPasswords list
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $pull: { savedPasswords: passwordId },
            },
            { new: true }
        );

        // return the saved password
        return res.status(200).json({
            success: true,
            message: "password deleted successfully",
            data: response,
            updatedUser: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Password deletion failed",
        });
    }
};

exports.getAllPasswords = async (req, res) => {
    try {
        const email = req.user.email;
        const user = await User.find(
            {
                email: email,
            },
            {
                savedPasswords: 1,
                _id: 0,
            },
            { new: true }
        )
            .populate("savedPasswords")
            .exec();

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get all passwords",
        });
    }
};
