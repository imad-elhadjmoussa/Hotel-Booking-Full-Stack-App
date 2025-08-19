import axios from "axios";
import type { HotelCategoryFilter, HotelSearchResponse, SearchParams } from "../types/types";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || "";

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    // withCredentials: true
});

export const searchHotels = async (params: SearchParams): Promise<HotelSearchResponse> => {
    const queryPrams = new URLSearchParams();
    queryPrams.append("destination", params.destination || "");
    queryPrams.append("checkInDate", params.checkInDate ? params.checkInDate.toISOString() : "");
    queryPrams.append("checkOutDate", params.checkOutDate ? params.checkOutDate.toISOString() : "");
    queryPrams.append("adultsCount", params.adultsCount?.toString() || "1");
    queryPrams.append("childCount", params.childCount?.toString() || "0");
    queryPrams.append("starRating", params.starRating ? params.starRating.toString() : "0");
    queryPrams.append("hotelTypes", params.hotelTypes?.join(",") || "");
    queryPrams.append("facilities", params.facilities?.join(",") || "");
    if (params.priceRange) {
        queryPrams.append("minPrice", params.priceRange[0].toString());
        queryPrams.append("maxPrice", params.priceRange[1].toString());
    }
    if (params.sortOption) {
        queryPrams.append("sortOption", params.sortOption);
    }
    queryPrams.append("page", params.page.toString());
    queryPrams.append("limit", params.limit.toString());
    console.log(`Searching hotels with params:`);
    try {
        const response = await api.get("/hotels/search", { params: queryPrams });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Searching Hotels failed");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};

export const getHotelById = async (hotelId: string) => {
    try {
        const response = await api.get(`/hotels/${hotelId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Fetching hotel details failed");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};

export const getHotels = async (params: HotelCategoryFilter) => {
    const queryParams = new URLSearchParams();
    queryParams.append("recommended", params.recommended?.toString() || "false");
    queryParams.append("newest", params.newest?.toString() || "false");
    queryParams.append("limit", params.limit.toString());
    queryParams.append("page", params.page.toString());

    try {
        const response = await api.get("/hotels", { params: queryParams });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Fetching hotels failed");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};
