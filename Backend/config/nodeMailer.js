const nodemailer = require("nodemailer");
require("dotenv").config();

exports.nodeMailer = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: `StudyNotion || -By Krish Makadiya`,
            to: `${email}`,
            subject: `${title}`,
            text: `${body}`,
        });
        return info;
    } catch (error) {
        console.error(`ERROR: ${error}`);
        console.error(`ERROR MESSAGE AT NODEMAILER: ${error.message}`);
    }
};
