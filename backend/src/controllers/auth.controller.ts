import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";



export const login = async (req: Request, res: Response): Promise<any> => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "1d" }
        );

        // Set cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(200).json({ message: "Login successful", user: { userId: user._id } });
    } catch (error) {
        console.log("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const validateToken = (req: Request, res: Response): any => {
    if (req.userId) {
        return res.status(200).json({ message: "Authorized", user: { userId: req.userId } });
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export const logout = (req: Request, res: Response): any => {
    res.clearCookie("auth_token");
    return res.status(200).json({ message: "Logout successful" });
};