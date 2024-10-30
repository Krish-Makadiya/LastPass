const Password = require("../models/Password.model");
const User = require("../models/User.model");
const crypto = require("crypto");

const secretKey = Buffer.from(process.env.CRYPTO_SECRET, "hex");
const ivLength = 16;

function encryptPassword(password) {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
    let encrypted = cipher.update(password, "utf8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`;
}

function decryptPassword(encryptedPassword) {
    const [ivHex, encrypted] = encryptedPassword.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

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

        const encryptedPassword = encryptPassword(password);

        const newPassword = await Password.create({
            linkName,
            linkUrl,
            username,
            password: encryptedPassword,
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
            message: "Password added successfully",
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
        const { passwordId } = req.body;
        const userId = req.user._id;

        const response = await Password.findByIdAndDelete(passwordId);

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $pull: { savedPasswords: passwordId },
            },
            { new: true }
        );

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

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const decryptedPasswords = user[0].savedPasswords.map(
            (passwordDoc) => ({
                linkName: passwordDoc.linkName,
                linkUrl: passwordDoc.linkUrl,
                username: passwordDoc.username,
                password: decryptPassword(passwordDoc.password),
            })
        );

        return res.status(200).json({
            success: true,
            data: decryptedPasswords,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get all passwords",
        });
    }
};
