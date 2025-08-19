import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IBooking extends Document {
    user: Types.ObjectId;
    hotel: Types.ObjectId;
    checkInDate: Date;
    checkOutDate: Date;
    adultsCount: number;
    childrenCount: number;
    totalCost: number;
    // BookingStatus: "pending" | "confirmed" | "canceled";
    createdAt: Date;
    updatedAt: Date;
};

const bookingSchema = new Schema<IBooking>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    adultsCount: {
        type: Number,
        required: true
    },
    childrenCount: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    // BookingStatus: {
    //     type: String,
    //     enum: ["pending", "confirmed", "canceled"],
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Booking: Model<IBooking> = mongoose.model("Booking", bookingSchema);

export default Booking;
