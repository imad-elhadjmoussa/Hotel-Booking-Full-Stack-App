import axios from "axios";

import type { ILoginFormData, IRegisterFormData } from "../validation/validation";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || "";

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});


export const register = async (data: IRegisterFormData) => {
    try {
        const response = await api.post("/users/register", data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Registration failed");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export const login = async (data: ILoginFormData) => {

    try {
        const response = await api.post("/auth/login", data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Login failed");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export const validateToken = async () => {
    try {
        const response = await api.get("/auth/validate-token");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Token validation failed");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export const logout = async () => {
    // puss the logout request to the server
    try {
        const response = await api.post("/auth/logout");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Logout failed");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await api.get("/users/me");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Failed to fetch current user");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}