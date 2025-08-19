import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { CurrentUser } from "../types/types";


export const register = async (req: Request, res: Response): Promise<any> => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password
        });

        // Save user to database
        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "1d" }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getCurrentUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findById(req.userId).select("-password -__v"); // Exclude password and version field
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const currentUser: CurrentUser = {
            _id: req.userId,
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            createdAt: user?.createdAt || new Date(),
            updatedAt: user?.updatedAt || new Date()
        };

        return res.status(200).json({
            success: true,
            data: currentUser,
            message: "User fetched successfully"
        });
    } catch (error) {
        console.log("Error fetching current user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
