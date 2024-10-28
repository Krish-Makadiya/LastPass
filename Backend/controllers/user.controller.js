const User = require("../models/User.model");

exports.getUserData = async (req, res) => {
    try {
        const { email } = req.user;

        if (!email) {
            return res
                .status(401)
                .json({ success: false, message: "No email provided" });
        }

        const userData = await User.find({ email: email });

        return res.status(200).json({
            success: true,
            message: "User data retrieved successfully",
            data: userData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get user data",
        });
    }
};
