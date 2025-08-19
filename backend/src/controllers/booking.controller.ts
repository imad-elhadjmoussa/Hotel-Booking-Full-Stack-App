import { Request, Response } from "express";
import Booking, { IBooking } from "../models/booking.model";
import Hotel from "../models/hotel.model";
import { validateBooking } from "../validations/bookingValidation";

export const createBooking = async (req: Request, res: Response): Promise<void> => {
    const {
        hotelId,
        checkInDate,
        checkOutDate,
        // BookingStatus,
        childrenCount,
        adultsCount,
        totalCost
    } = req.body;
    const userId = req.userId;

    try {

        const validationError = validateBooking({
            checkInDate,
            checkOutDate,
            adultsCount,
            childrenCount
        });

        if (validationError) {
            res.status(400).json({
                success: false,
                message: validationError
            });
            return;
        }

        // check if hotel exists
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
            return;
        }

        const newBooking = new Booking({
            hotel: hotelId,
            user: userId,
            checkInDate,
            checkOutDate,
            adultsCount,
            childrenCount,
            // BookingStatus: BookingStatus || "pending",
            userId,
            totalCost
        });

        await newBooking.save();



        res.status(201).json({
            success: true,
            data: newBooking,
            message: "Booking created successfully"
        });
        return;
    } catch (error) {
        console.log("Error creating booking:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        return;
    }
};


export const getMyBookings = async (req: Request, res: Response): Promise<void> => {
    const user = req.userId;

    try {
        const bookings = await Booking.find({ user }).populate("hotel").exec();

        res.status(200).json({
            success: true,
            data: bookings,
            message: "Bookings retrieved successfully"
        });
        return;
    } catch (error) {
        console.log("Error retrieving bookings:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        return;
    }
};