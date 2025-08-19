import { Calendar, Clock, MapPin, Star, Users } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import type { BookingDetails } from "../types/types";


function BookingCard({ booking }: { booking: BookingDetails }) {
    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);
    const nights = Math.ceil(
        (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const { currency } = useAppContext();

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Card className="overflow-hidden p-0">
            <div className="flex flex-col lg:flex-row p-5 gap-5 ">
                {/* Hotel Image */}
                <div className="lg:w-90 lg:h-64 h-48 relative overflow-hidden  ">
                    <img
                        src={booking.hotel.images[0]}
                        alt={booking.hotel.name}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    {/* Star Rating Overlay */}
                    <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-yellow-600 border-yellow-200">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            {booking.hotel.starRating}
                        </Badge>
                    </div>
                </div>

                {/* Booking Details */}
                <div className="flex-1 flex  flex-col   ">
                    <CardHeader className=" p-0">
                        <div className="flex justify-between  items-start mb-2">
                            <div className="flex-1">
                                <CardTitle className="text-xl text-gray-900 mb-1">
                                    {booking.hotel.name}
                                </CardTitle>
                                <CardDescription className="flex items-center text-gray-500">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {booking.hotel.city}, {booking.hotel.country}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 p-0">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-gray-100 p-2 rounded-lg">
                                <div className="flex items-center text-gray-500 mb-1">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span className="text-xs font-medium">CHECK-IN</span>
                                </div>
                                <p className="font-semibold text-gray-900">{formatDate(checkInDate)}</p>
                            </div>

                            <div className="bg-gray-100 p-2 rounded-lg">
                                <div className="flex items-center text-gray-500 mb-1">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span className="text-xs font-medium">CHECK-OUT</span>
                                </div>
                                <p className="font-semibold text-gray-900">{formatDate(checkOutDate)}</p>
                            </div>

                            <div className="bg-gray-100 p-2 rounded-lg">
                                <div className="flex items-center text-gray-500 mb-1">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span className="text-xs font-medium">DURATION</span>
                                </div>
                                <p className="font-semibold text-gray-900">
                                    {nights} night{nights !== 1 ? 's' : ''}
                                </p>
                            </div>

                            <div className="bg-gray-100 p-2 rounded-lg">
                                <div className="flex items-center text-gray-500 mb-1">
                                    <Users className="w-4 h-4 mr-1" />
                                    <span className="text-xs font-medium">GUESTS</span>
                                </div>
                                <p className="font-semibold text-gray-900">
                                    {booking.adultsCount + booking.childrenCount} total
                                </p>
                                <p className="text-xs text-gray-500">
                                    {booking.adultsCount} adult{booking.adultsCount !== 1 ? 's' : ''}, {booking.childrenCount} child{booking.childrenCount !== 1 ? 'ren' : ''}
                                </p>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className=" p-0 mt-5 md:mt-0">
                        <div className="flex justify-between items-center w-full">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {booking.totalCost} <span className="text-lg text-gray-600">{currency}</span>
                                </p>
                            </div>
                        </div>
                    </CardFooter>
                </div>
            </div>
        </Card>
    );
}

export default BookingCard;