import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Star, MapPin, Hotel as HotelIcon, Users, Baby, Wifi, Trash2, Edit, Phone, Edit2Icon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import type { Hotel } from "../types/types";
import { useAppContext } from "../contexts/AppContext";
import { facilityIcons } from "../config/constants";
import { Link } from "react-router-dom";



export function HotelCard({ hotel }: { hotel: Hotel }) {

    const { currency } = useAppContext()

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
    };

    return (
        <Card className="w-full overflow-hidden border rounded-2xl p-5">
            <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Button
                    variant="outline"
                    size="sm"
                    className="p-2 h-8 w-8"
                >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="p-2 h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
                >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row">

                {/* Image Gallery - Modern Carousel Style */}
                <div className="lg:w-1/2 md:h-auto h-64 relative group">
                    {hotel.images.length > 0 ? (
                        <>
                            {/* Main Image */}
                            <img
                                src={hotel.images[currentImageIndex]}
                                alt={`${hotel.name} image ${currentImageIndex + 1}`}
                                className="w-full h-full object-cover rounded-lg transition-opacity duration-300"
                            />

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                aria-label="Previous image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                aria-label="Next image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {/* Thumbnail Strip */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                {hotel.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Image Counter */}
                            <div className="absolute top-4 right-4 bg-black/60 text-white text-sm px-2 py-1 rounded-full">
                                {currentImageIndex + 1}/{hotel.images.length}
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No images available</span>
                        </div>
                    )}
                </div>

                {/* Content Area */}
                <div className="lg:w-1/2 flex flex-col p-6">
                    <div className="flex justify-end  mb-4">
                        <Link to={`/edit-hotel/${hotel._id}`}>
                            <Button size="sm" variant="outline" >
                                <Edit2Icon className="h-4 w-4 mr-2" />
                                Edit Hotel
                            </Button>
                        </Link>
                    </div>
                    <CardHeader className="pb-2 px-0 pt-0">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-2xl font-bold text-gray-900">{hotel.name}</CardTitle>
                            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-medium">{hotel.starRating}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{hotel.city}, {hotel.country}</span>
                        </div>

                        <Badge variant="secondary" className="mt-3 w-fit capitalize">
                            <HotelIcon className="h-3 w-3 mr-1" />
                            {hotel.type}
                        </Badge>
                    </CardHeader>

                    <CardContent className="px-0 pb-0 flex-1 flex flex-col">
                        <p className="text-gray-600 mb-6 line-clamp-3">{hotel.description}</p>

                        {/* Facilities - Modern Grid Layout */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Facilities</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {hotel.facilities.map((facility) => (
                                    <div key={facility} className="flex items-center gap-2">
                                        <div className="bg-gray-100 p-2 rounded-lg">
                                            {facilityIcons[facility] || <Wifi className="h-4 w-4 text-gray-600" />}
                                        </div>
                                        <span className="text-gray-700 text-sm">{facility}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price & Booking - Sticky to bottom */}
                        <div className="mt-auto border-t pt-5">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Starting from</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {hotel.pricePerNight.toFixed(2)} {currency}
                                        <span className="text-sm font-normal text-gray-500"> / night</span>
                                    </p>
                                </div>

                                <Button>
                                    <HotelIcon className="h-4 w-4" />
                                    Book Now
                                </Button>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    <span>{hotel.adultsCount} Adults</span>
                                </div>
                                {hotel.childCount > 0 && (
                                    <div className="flex items-center gap-1">
                                        <Baby className="h-4 w-4" />
                                        <span>{hotel.childCount} Children</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>{hotel.contactInfo}</span>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </div>
        </Card>
    );
}