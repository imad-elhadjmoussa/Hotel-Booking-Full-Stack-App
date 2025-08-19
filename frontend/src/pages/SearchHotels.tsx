import bg from "../assets/search-hotels-background.jpg";
import { useSearchContext } from "../contexts/SearchContext";
import { useQuery } from "@tanstack/react-query";
import { searchHotels } from "../api/hotels.api";
import { useState } from "react";
import PaginationControl from "../components/PaginationControl";
import SearchBar from "../components/SearchBar";
import { SearchFilterCard } from "../components/SearchFilterCard";
import type { HotelSearchResponse } from "../types/types";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import HotelSearchCardSkeleton from "../components/Skeletons/HotelSearchCardSkeleton";
import { HotelSearchCard } from "../components/HotelSearchCard";
import { Link } from "react-router-dom";
import { SortBy } from "../components/SortBy";

const LIMIT = 6; // More reasonable number of hotels per page

const SearchHotels = () => {
    const [page, setPage] = useState(1);
    const searchContext = useSearchContext();

    const {
        data: hotelData,
        isLoading,
        isError,
        error
    } = useQuery<HotelSearchResponse>({
        queryKey: ["searchHotels", { ...searchContext, page }],
        queryFn: () => searchHotels({
            checkInDate: searchContext.checkIn,
            checkOutDate: searchContext.checkOut,
            destination: searchContext.destination,
            adultsCount: searchContext.adultCount,
            childCount: searchContext.childrenCount,
            starRating: searchContext.starRating,
            hotelTypes: searchContext.hotelTypes,
            facilities: searchContext.facilities,
            priceRange: searchContext.priceRange,
            sortOption: searchContext.sortOption,
            page,
            limit: LIMIT
        }),
        retry: 1,
        staleTime: 5 * 60 * 1000 // 5 minutes
    });

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {Array.from({ length: LIMIT }).map((_, index) => (
                        <HotelSearchCardSkeleton key={`skeleton-${index}`} />
                    ))}
                </div>
            );
        }

        if (isError) {
            return (
                <Alert variant="destructive" className="mb-8">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error loading hotels</AlertTitle>
                    <AlertDescription>
                        {error instanceof Error ? error.message : "An unknown error occurred"}
                    </AlertDescription>
                </Alert>
            );
        }

        if (!hotelData?.data || hotelData.data.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                        Try adjusting your search filters or dates to find available hotels.
                    </p>
                </div>
            );
        }

        return (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {hotelData.data.map(hotel => (
                        <Link to={`/hotel/${hotel._id}`} key={hotel._id}>
                            <HotelSearchCard hotel={hotel} />
                        </Link>
                    ))}
                </div>

                {hotelData.pagination.totalPages > 1 && (
                    <div className="mt-8">
                        <PaginationControl
                            currentPage={hotelData.pagination.page}
                            totalPages={hotelData.pagination.totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="w-full">
            {/* Hero Section with Search Bar */}
            <div className="relative h-[50vh] w-full">
                <img
                    src={bg}
                    alt="Search Hotels Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="container absolute bottom-0 left-1/2 w-full max-w-5xl px-4 transform -translate-x-1/2 translate-y-1/2">
                    <SearchBar />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 py-8 md:mt-20 mt-40">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar - Left */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <SearchFilterCard />
                    </div>

                    {/* Hotels Grid - Right */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Search Results</h2>
                            <div className="w-48">
                                <SortBy />
                            </div>
                        </div>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SearchHotels;