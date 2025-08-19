import { Dumbbell, ParkingCircle, Space, Utensils, Waves, Wifi } from "lucide-react";
import type { JSX } from "react";

export const facilityOptions = [
    { value: "Free WiFi", label: "Free WiFi" },
    { value: "Free Parking", label: "Free Parking" },
    { value: "Swimming Pool", label: "Swimming Pool" },
    { value: "Gym", label: "Gym" },
    { value: "Spa", label: "Spa" },
    { value: "Restaurant", label: "Restaurant" },
];

export const hotelFacilities = [
    "Free WiFi",
    "Free Parking",
    "Swimming Pool",
    "Gym",
    "Spa",
    "Restaurant",
];

export const hotelTypes = ["Hotel", "Resort", "Villa", "Apartment", "Hostel"];


export const facilityIcons: Record<string, JSX.Element> = {
    'Free WiFi': <Wifi className="h-4 w-4" />,
    'Free Parking': <ParkingCircle className="h-4 w-4" />,
    'Swimming Pool': <Waves className="h-4 w-4" />,
    'Gym': <Dumbbell className="h-4 w-4" />,
    'Spa': <Space className="h-4 w-4" />,
    'Restaurant': <Utensils className="h-4 w-4" />,
};