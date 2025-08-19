import axios from "axios";
import type { Booking } from "../types/types";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || "";

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true
});

export const createBooking = async (bookingData: Booking) => {
    // pause
    try {
        const response = await api.post("/bookings", bookingData);
        return response.data;
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};

export const getMyBookings = async () => {
    try {
        const response = await api.get("/bookings/my-bookings");
        return response.data;
    } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
    }
};
