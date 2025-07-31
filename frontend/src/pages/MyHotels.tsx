import { useQuery } from "@tanstack/react-query"
import { getMyHotels } from "../api/hotels.api"
import { HotelCard } from "../components/HotelCard"
import { Button } from "../components/ui/button";
import type { Hotel } from "../types/types";
import Error from "../components/Error";
import { HotelCardSkeleton } from "../components/Skeletons/HotelCardSkeleton";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const MyHotels = () => {

    const {
        data: hotels,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['myHotels'],
        queryFn: getMyHotels
    })

    if (isError) {
        return (
            <Error message="Error in fetching hotels" />
        )
    }

    return (
        <div className="container  mt-16 py-12 min-h-[calc(100vh-4rem)]">

            <div className=" flex items-center mb-3 justify-between ">
                <h1 className="text-3xl font-bold ">
                    My Hotels
                </h1>
                <Link to="/add-hotel">
                    <Button >
                        <Plus className="h-4 w-4" />
                        Add Hotel
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col gap-5">
                {isLoading ? (
                    <>
                        <HotelCardSkeleton />
                        <HotelCardSkeleton />
                    </>
                ) : (
                    hotels?.data?.length > 0 ? (
                        hotels.data.map((hotel: Hotel) => (
                            <HotelCard key={hotel._id} hotel={hotel} />
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-64">
                            <h2 className="text-xl font-semibold text-gray-700">No Hotels Found</h2>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}




export default MyHotels