import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";


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

