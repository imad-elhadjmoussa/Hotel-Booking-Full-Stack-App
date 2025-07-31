import { Request, Response } from "express";
import Hotel from "../models/hotel.model";

export const getSearchedHotels = async (req: Request, res: Response) => {
    try {
        // pagination logic
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const hotels = await Hotel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
        const totalHotels = await Hotel.countDocuments();
        const totalPages = Math.ceil(totalHotels / limit);


        res.status(200).json({
            success: true,
            data: hotels,
            pagination: {
                page,
                limit,
                total: totalHotels,
                totalPages,
            },
        });
    } catch (error) {
        console.log("error in getSearchedHotels controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
