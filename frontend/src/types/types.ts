export type ToastMessage = {
    type: "success" | "error";
    message: string;
}

export type Hotel = {
    _id: string;
    userId?: string;
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

export type SearchParams = {
    destination?: string;
    checkInDate?: Date;
    checkOutDate?: Date;
    adultsCount?: number;
    childCount?: number;
    starRating?: number;
    hotelTypes?: string[];
    facilities?: string[];
    priceRange?: [number, number];
    sortOption?: SearchOptionsType;
    page: number;
    limit: number;
}

export type HotelSearchResponse = {
    success: boolean;
    data: Hotel[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export type CurrentUser = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Booking = {
    hotelId: string;
    checkInDate: Date;
    checkOutDate: Date;
    adultsCount: number | undefined;
    childrenCount: number | undefined;
    totalCost: number | undefined;
}

export type SearchOptionsType = "pricePerNightAsc" | "pricePerNightDesc" | "starRating" | undefined;

export interface BookingDetails {
    _id: string;
    userId: string;
    hotel: Hotel;
    checkInDate: string;
    checkOutDate: string;
    adultsCount: number;
    childrenCount: number;
    totalCost: number;
    BookingStatus: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type HotelCategoryFilter = {
    recommended?: boolean;
    newest?: boolean;
    limit: number;
    page: number;
};
