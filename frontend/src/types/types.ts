export type ToastMessage = {
    type: "success" | "error";
    message: string;
}

export type Hotel = {
    _id: string;
    name: string;
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
};