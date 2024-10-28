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

            html: ` <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        
                        <title>Reset Your Password</title>
                        <style>
                            body {
                                font-family: Poppins, sans-serif;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                max-width: 600px;
                                margin: 20px auto;
                                background-color: #ffffff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                            .content {
                                font-size: 16px;
                                line-height: 1.6;
                            }
                            .button {
                                display: inline-block;
                                padding: 10px 20px;
                                background-color: #001E2B;
                                color: #00ED64;
                                text-decoration: none;
                                border-radius: 5px;
                                font-weight: bold;
                                margin-top: 10px;
                                margin-bottom: 10px;
                                border: 2px solid #00ED64;
                            }
                            .footer {
                                font-size: 12px;
                                color: #888;
                                text-align: center;
                                margin-top: 30px;
                            }
                            span{
                                color: #00ED64;
                                font-weight: 600;
                            }
                        </style>
                    </head>

                    <body>
                        <div class="container">
                            <div class="content">
                                <p>Hello, <br/> We received a request to <span>reset your password.</span> Click the button below to set up a <span>new password.</span></p>
                                <p><a href="${body}" class="button">Reset Password</a></p>
                                <p>If you didn’t request this, please ignore this email.</p>
                            </div>
                            <div class="footer">
                                <p>&copy; 2024 LastPass. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                </html>`,
        });
        return info;
    } catch (error) {
        console.error(`ERROR: ${error}`);
        console.error(`ERROR MESSAGE AT NODEMAILER: ${error.message}`);
    }
};
