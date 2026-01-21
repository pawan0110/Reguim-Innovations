import sendMail from "../Utils/sendEmail.js";
import { generateOtp } from "../Utils/generateOtp.js";
import { generateToken } from "../Utils/generateToken.js";
import validator from "validator";
import User from "../models/userModel.js";
import { hashOtp, verifyOtpHash } from "../Utils/otpHash.js";

/// SEND OTP (LOGIN / SIGNUP)

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const otp = generateOtp();
    const hashedOtp = hashOtp(otp);

    await User.findOneAndUpdate(
      { email },
      {
        loginOtp: hashedOtp,
        otpExpires: Date.now() + 5 * 60 * 1000,
        isOtpVerified: false,
        authProvider: "otp",
      },
      { upsert: true, new: true }
    );

    await sendMail(email, otp);
    return res.status(200).json({ message: "OTP sent succesfully" });
  } catch (error) {
    return res.status(500).json({ message: `send OTP error: ${error} ` });
  }
};

// verify OTP (SIGNUP + LOGIN)

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, name } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isValidOtp = verifyOtpHash(otp, user.loginOtp);
    const isOtpExpired = user.otpExpires < Date.now();

    if (!isValidOtp || isOtpExpired) {
      return res.status(400).json({ message: "Invalid or Expired OTP" });
    }

    if (!user.name && name) {
      user.name = name;
    }

    user.loginOtp = undefined;
    user.otpExpires = undefined;
    user.isOtpVerified = true;
    user.lastLoginAt = Date.now();
    if (!user.name && name) user.name = name;

    await user.save();

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.Node_ENV === "production",
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        authProvider: user.authProvider,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: `Verify OTP error: ${error}` });
  }
};

// RESEND OTP

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //    const canResend = !user.otpExpires || (user.otpExpires - Date.now() < 4 * 60 * 1000);
    //     if (!canResend) {
    //         return res.status(429).json({ message: "Please wait 1 minute before requesting a new OTP" });
    //     }
    const otp = generateOtp();
    const hashedOtp = hashOtp(otp);

    user.loginOtp = hashedOtp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;

    await user.save();
    await sendMail(email, otp);

    return res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Resend OTP error: ${error}` });
  }
};

/// GOOGLE LOGIN / SIGNUP

export const googleLogin = async (req, res) => {
  try {
    // defensively read body
    const { name, email } = req.body || {};

    // debug log (remove or lower verbosity in production)
    console.log("googleLogin called, body:", req.body);

    if (!email) {
      return res.status(400).json({ message: "Email is required for Google login" });
    }

    // find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        authProvider: "google",
      });
    }

    // update last login and optional name
    user.lastLoginAt = Date.now();
    if (!user.name && name) user.name = name;

    await user.save();

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Google login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        authProvider: user.authProvider,
      },
    });
  } catch (error) {
    console.error("googleLogin error:", error);
    return res.status(500).json({ message: `Google login error: ${error}` });
  }
};
