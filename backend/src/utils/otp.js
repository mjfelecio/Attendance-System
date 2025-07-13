import crypto from "crypto";

export const generateOTP = () => crypto.randomInt(100000, 999999).toString();
export const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
