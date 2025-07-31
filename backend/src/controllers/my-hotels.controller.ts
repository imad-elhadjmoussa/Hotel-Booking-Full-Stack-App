import { Request, Response } from 'express';
import Hotel, { IHotel } from '../models/hotel.model';
import cloudinary from '../lib/cloudinary';
import { validationResult } from 'express-validator';


const uploadToCloudinary = (fileBuffer: Buffer): Promise<string> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
                if (error) return reject(error);
                if (result?.secure_url) {
                    resolve(result.secure_url);
                } else {
                    reject(new Error('Upload failed, no secure URL returned.'));
                }
            }
        );
        stream.end(fileBuffer);
    });
};


// Create a new hotel
export const createHotel = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate the request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: errors.array()
            });
            return;
        }
        // Get the images
        const images = req.files as Express.Multer.File[];
        // uploaded images in cloudinary
        const imageUrls = await Promise.all(
            images.map((file) => uploadToCloudinary(file.buffer))
        );

        const hotelData: IHotel = {
            userId: req.userId, // Assuming user ID is stored in req.user
            ...req.body,
            starRating: parseInt(req.body.starRating),
            adultsCount: parseInt(req.body.adultsCount),
            childCount: parseInt(req.body.childCount),
            pricePerNight: parseFloat(req.body.pricePerNight),
            facilities: req.body.facilities,
            contactInfo: req.body.contactInfo,
            name: req.body.name,
            country: req.body.country,
            city: req.body.city,
            description: req.body.description,
            type: req.body.type,
            images: imageUrls, // Store the URLs of the uploaded images
        };

        const newHotel = new Hotel(hotelData);
        const savedHotel = await newHotel.save();

        res.status(201).json({
            success: true,
            message: 'Hotel created successfully',
            data: savedHotel
        });
    } catch (error) {
        console.log("Error creating hotel:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Get my hotels
export const getMyHotels = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId; // Get user ID from request
        const hotels = await Hotel.find({ userId });

        res.status(200).json({
            success: true,
            data: hotels
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Get a single hotel by ID
export const getHotel = async (req: Request, res: Response): Promise<void> => {
    try {
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: hotel
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Update a hotel
export const updateHotel = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate the request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: errors.array()
            });
            return;
        }

        // Get the images
        const images = req.files as Express.Multer.File[];
        let imageUrls: string[] = [];

        if (images && images.length > 0) {
            // Upload new images to cloudinary
            imageUrls = await Promise.all(
                images.map((file) => uploadToCloudinary(file.buffer))
            );
        }

        const updateData: Partial<IHotel> = {
            ...req.body,
            starRating: parseInt(req.body.starRating),
            adultsCount: parseInt(req.body.adultsCount),
            childCount: parseInt(req.body.childCount),
            pricePerNight: parseFloat(req.body.pricePerNight),
            facilities: req.body.facilities,
            contactInfo: req.body.contactInfo,
            name: req.body.name,
            country: req.body.country,
            city: req.body.city,
            description: req.body.description,
            type: req.body.type,
        };

        if (imageUrls.length > 0) {
            updateData.images = imageUrls; // Update images only if new ones are provided
        }

        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedHotel) {
            res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: updatedHotel
        });
    } catch (error) {
        console.log("Error updating hotel:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Delete a hotel
export const deleteHotel = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);

        if (!deletedHotel) {
            res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: deletedHotel
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};