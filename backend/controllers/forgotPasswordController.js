import userModel from "../models/userModel.js";
import { createTransport } from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

// Route to handle "forgot password" request
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check if email exists in the database
        const user = await userModel.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found with this email' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetToken = resetToken;
        await user.save();

        // Client URL for password reset link
        const clientUrl = process.env.CLIENT_URL || 'https://todo-rahul-dev.vercel.app';
        const formattedClientUrl = clientUrl.startsWith("http") ? clientUrl : `https://${clientUrl}`;
        const resetUrl = `${formattedClientUrl.replace(/\/$/, '')}/resetPassword?token=${resetToken}`;

        console.log(`\n========================================\n[PASSWORD RESET LINK]:\n${resetUrl}\n========================================\n`);

        if (process.env.GMAIL_USERNAME && process.env.GMAIL_PASSWORD) {
            try {
                const transporter = createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.GMAIL_USERNAME,
                        pass: process.env.GMAIL_PASSWORD
                    }
                });

                const mailOptions = {
                    from: `"Todo App" <${process.env.GMAIL_USERNAME}>`,
                    to: normalizedEmail,
                    subject: "Reset Password - Todo App",
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                            <h2>Password Reset Request</h2>
                            <p>You requested to reset your password. Please click the link below to set a new password:</p>
                            <p style="margin: 20px 0;">
                                <a href="${resetUrl}" style="background-color: #2563eb; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
                            </p>
                            <p>Or copy this link to your browser:</p>
                            <p><a href="${resetUrl}">${resetUrl}</a></p>
                            <p style="color: #777; font-size: 12px;">If you didn't request this, please ignore this email.</p>
                        </div>
                    `
                };

                await transporter.sendMail(mailOptions);
                return res.status(200).json({ message: 'A link to reset your password has been sent to your email.' });
            } catch (mailError) {
                console.error("Email sending failed (Gmail SMTP):", mailError.message);
                // Graceful return with reset URL printed in console for testing
                return res.status(200).json({ 
                    message: 'Password reset link generated! (Check terminal console for the direct link if email is not received).' 
                });
            }
        } else {
            return res.status(200).json({ 
                message: 'Password reset link generated! (Check terminal console for link).' 
            });
        }
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        return res.status(500).json({ message: error.message || 'Something went wrong. Please try again.' });
    }
};

// Route to handle password reset request
const resetPassword = async (req, res) => {
    const { token, password } = req.body;
    try {
        if (!token || !password) {
            return res.status(400).json({ message: 'Token and new password are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Verify reset token
        const user = await userModel.findOne({ resetToken: token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Update password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetToken = null;
        await user.save();

        return res.status(200).json({ message: 'Password reset successful. You can now login with your new password.' });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        return res.status(500).json({ message: error.message || 'Error resetting password' });
    }
};

export { forgotPassword, resetPassword };
