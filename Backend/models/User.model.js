const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String, 
            required: true,
        },
        token: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
        savedPasswords: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Password",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", schema);
