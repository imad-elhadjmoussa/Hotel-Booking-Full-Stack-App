import { useQuery } from '@tanstack/react-query';
import { getMyBookings } from '../api/booking.api';
import type { BookingDetails } from '../types/types';
import Error from '../components/Error';
import { Calendar } from 'lucide-react';
import BookingCard from '../components/BookingCard';
import { BookingCardSkeleton } from '../components/Skeletons/BookingCardSkeleton';

export default function MyBookings() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['bookings'],
        queryFn: getMyBookings,
    });

    if (isError) {
        return (
            <div className='h-screen flex items-center justify-center'>
                <Error message={error.message} />
            </div>
        );
    }

    return (
        <div className="container mt-20 mb-8 ">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
            </div>

            {isLoading ? (
                <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <BookingCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <div className="space-y-6">
                    {data?.data?.length ? (
                        data.data.map((booking: BookingDetails) => (
                            <BookingCard key={booking._id} booking={booking} />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <Calendar className="w-16 h-16 mx-auto" />
                            </div>
                            <p className="text-xl text-gray-500 mb-2">No bookings found</p>
                            <p className="text-gray-400">Your future reservations will appear here</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
