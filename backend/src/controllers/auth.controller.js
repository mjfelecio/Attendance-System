import { Otp } from "../models/index.js";
import { generateOTP, OTP_TTL_MS } from "../utils/otp.js";
import { sendOtpMail } from "../utils/mailer.js";

export const requestOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
        const code = generateOTP();
        const expiresAt = new Date(Date.now() + OTP_TTL_MS);

        await Otp.upsert({ email, code, expiresAt });
        await sendOtpMail(email, code);

        res.status(200).json({ success: true, message: "OTP sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
};

export const verifyOtp = async (req, res) => {
    const { email, code } = req.body;
    if (!email || !code) {
        return res.status(400).json({ success: false, message: "Email and code are required" });
    }

    try {
        const record = await Otp.findByPk(email);

        if (!record || record.code !== code || record.expiresAt < new Date()) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        await record.destroy(); // one-time use

        // For now we simply confirm success; integrate JWT/session as needed.
        res.status(200).json({ success: true, message: "OTP verified" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "OTP verification failed" });
    }
};
