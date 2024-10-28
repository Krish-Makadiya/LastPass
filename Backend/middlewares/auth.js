const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

exports.auth = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization;

        if (!authToken) {
            return res
                .status(401)
                .json({ msg: "No token, authorization denied" });
        }
        const token = authToken.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(payload.userId);
        if (!user) {
            return res.status(401).json({ msg: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: `Authentication failed: ${error}`,
        });
    }
};
