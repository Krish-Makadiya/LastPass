const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        linkName: {
            type: String,
            required: true,
        },
        linkUrl: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Password", schema);
