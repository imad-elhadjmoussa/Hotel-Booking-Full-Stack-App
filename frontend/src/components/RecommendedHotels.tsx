import { useQuery } from "@tanstack/react-query";
import { getHotels } from "../api/hotels.api";
import type { Hotel, HotelCategoryFilter } from "../types/types";
import { HotelSearchCard } from "./HotelSearchCard";
import HotelSearchCardSkeleton from "./Skeletons/HotelSearchCardSkeleton";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const RecommendedHotels = () => {
    const filterOption: HotelCategoryFilter = {
        recommended: true,
        limit: 4,
        page: 1
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["recommendedHotels"],
        queryFn: () => getHotels(filterOption),
    });


    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold text-center mb-6">Recommended Hotels</h2>

            {isError ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                    Error loading hotels: {error instanceof Error ? error.message : "Unknown error"}
                </div>
            ) : (
                <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <HotelSearchCardSkeleton />
                            </div>
                        ))
                    ) : (
                        data?.data.map((hotel: Hotel) => (
                            <div key={hotel._id} className="h-full px-10 md:px-0">
                                <HotelSearchCard hotel={hotel} />
                            </div>
                        ))
                    )}
                </div>
            )}

            <div className="flex justify-center mt-6">
                <Link to="/search-hotels">
                    <Button variant={"outline"}>
                        View All Hotels
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default RecommendedHotels;