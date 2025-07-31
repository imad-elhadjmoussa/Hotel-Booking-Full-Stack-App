import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || "";

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true
});

export const addHotel = async (formData: FormData) => {
    try {
        const response = await api.post("/my-hotels", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Adding Hotel failed");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export const getMyHotels = async () => {
    try {
        const response = await api.get("/my-hotels");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Fetching Hotels failed");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};

export const getHotelById = async (id: string) => {
    try {
        const response = await api.get(`/my-hotels/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Fetching Hotel failed");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export const updateHotel = async (id: string, formData: FormData) => {
    try {
        const response = await api.put(`/my-hotels/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Updating Hotel failed");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};
