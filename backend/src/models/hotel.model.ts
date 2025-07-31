
import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Interface for TypeScript typing
export interface IHotel extends Document {
    name: string;
    userId: string;
    country: string;
    city: string;
    description: string;
    starRating: number;
    type: string;
    adultsCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    contactInfo: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

// 2. Mongoose Schema
const HotelSchema = new Schema<IHotel>(
    {
        userId: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        starRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        type: {
            type: String,
            required: true,
        },
        adultsCount: {
            type: Number,
            required: true,
            min: 1,
        },
        childCount: {
            type: Number,
            required: true,
            min: 0,
        },
        facilities: {
            type: [String],
            required: true,
        },
        pricePerNight: {
            type: Number,
            required: true,
            min: 0,
        },
        contactInfo: {
            type: String,
            required: true,
            trim: true,
        },
        images: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);



// 3. Model export (prevent model overwrite in dev)
const Hotel: Model<IHotel> = mongoose.models.Hotel || mongoose.model<IHotel>("Hotel", HotelSchema);

export default Hotel;

