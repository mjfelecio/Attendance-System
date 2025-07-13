import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const {
    EMAIL_USER,
    EMAIL_CLIENT_ID,
    EMAIL_CLIENT_SECRET,
    EMAIL_REFRESH_TOKEN,
} = process.env;

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    EMAIL_CLIENT_ID,
    EMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({ refresh_token: EMAIL_REFRESH_TOKEN });

export const sendOtpMail = async (to, code) => {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: EMAIL_USER,
            clientId: EMAIL_CLIENT_ID,
            clientSecret: EMAIL_CLIENT_SECRET,
            refreshToken: EMAIL_REFRESH_TOKEN,
            accessToken: accessToken.token,
        },
    });

    await transporter.sendMail({
        from: `Attendance System <${EMAIL_USER}>`,
        to,
        subject: "Your One-Time Password",
        text: `Your OTP is ${code}. It expires in 5 minutes.`,
    });
};
