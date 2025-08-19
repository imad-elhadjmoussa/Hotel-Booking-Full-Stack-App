import { Request, Response } from "express";
import Hotel from "../models/hotel.model";

const SORT_OPTIONS = {
    PRICE_PER_NIGHT_ASC: "pricePerNightAsc",
    PRICE_PER_NIGHT_DESC: "pricePerNightDesc",
    STAR_RATING: "starRating",
}


export const getSearchedHotels = async (req: Request, res: Response) => {
    try {
        // Pagination logic
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 6;
        const skip = (page - 1) * limit;

        // Extract filter parameters
        const {
            destination,
            checkInDate,
            checkOutDate,
            adultsCount,
            childCount,
            starRating,
            hotelTypes,
            facilities,
            // minPrice,
            // maxPrice,
            sortOption
        } = req.query;

        // Build the filter object
        const filter: any = {};

        // Destination filter (search in city or country)
        if (destination) {
            const destString = (destination as string).toLowerCase();
            filter.$or = [
                { city: { $regex: destString, $options: 'i' } },
                { country: { $regex: destString, $options: 'i' } }
            ];
        }

        // Star rating filter
        if (starRating) {
            filter.starRating = { $gte: parseInt(starRating as string) };
        }

        // Hotel type filter
        if (hotelTypes) {
            const typesArray = (hotelTypes as string).split(',');
            filter.type = { $in: typesArray };
        }

        // Facilities filter
        if (facilities) {
            const facilitiesArray = (facilities as string).split(',');
            filter.facilities = { $all: facilitiesArray };
        }

        // Price range filter
        // if (minPrice || maxPrice) {
        //     filter.pricePerNight = {};
        //     if (minPrice) filter.pricePerNight.$gte = parseInt(minPrice as string);
        //     if (maxPrice) filter.pricePerNight.$lte = parseInt(maxPrice as string);
        // }

        // Capacity filter
        if (adultsCount) {
            filter.adultsCount = { $gte: parseInt(adultsCount as string) };
        }
        if (childCount) {
            filter.childCount = { $gte: parseInt(childCount as string) };
        }

        // Build sort object
        const sort: any = {};

        if (sortOption) {
            switch (sortOption) {
                case SORT_OPTIONS.PRICE_PER_NIGHT_ASC:
                    sort.pricePerNight = 1; // Ascending order
                    break;
                case SORT_OPTIONS.PRICE_PER_NIGHT_DESC:
                    sort.pricePerNight = -1; // Descending order
                    break;
                case SORT_OPTIONS.STAR_RATING:
                    sort.starRating = -1; // Descending order (higher ratings first)
                    break;
                default:
                    // Default sort by creation date if no valid sort option
                    sort.createdAt = -1;
            }
        } else {
            // Default sort by creation date if no sort option provided
            sort.createdAt = -1;
        }

        // Query with filters and sorting
        const hotels = await Hotel.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec();

        const totalHotels = await Hotel.countDocuments(filter);
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

export const getHotelById = async (req: Request, res: Response): Promise<void> => {
    try {
        const hotelId = req.params.id;
        const hotel = await Hotel.findById(hotelId).exec();

        if (!hotel) {
            res.status(404).json({ message: "Hotel not found" });
            return;
        }

        res.status(200).json({
            success: true,
            data: hotel,
        });
    } catch (error) {
        console.log("error in getHotelById controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getHotels = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = "1", limit = "6", recommended, newest } = req.query;

        const pageNum = parseInt(page as string, 10) || 1;
        const limitNum = parseInt(limit as string, 10) || 6;
        const skip = (pageNum - 1) * limitNum;

        let hotels;

        if (recommended === "true") {
            // 🔹 Sort hotels by star rating (highest first)
            hotels = await Hotel.find()
                .sort({ starRating: -1 }) // 5 ⭐ → 1 ⭐
                .skip(skip)
                .limit(limitNum)
                .exec();
        } else if (newest === "true") {
            // 🔹 Sort hotels by newest created
            hotels = await Hotel.find()
                .sort({ createdAt: -1 }) // newest → oldest
                .skip(skip)
                .limit(limitNum)
                .exec();
        } else {
            // 🔹 Default: return hotels without sorting preference (or you can keep latest here too)
            hotels = await Hotel.find()
                .skip(skip)
                .limit(limitNum)
                .exec();
        }

        res.status(200).json({
            success: true,
            data: hotels,
        });
    } catch (error) {
        console.error("error in getHotels controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


