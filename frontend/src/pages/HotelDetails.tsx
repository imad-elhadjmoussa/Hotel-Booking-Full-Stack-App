import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
    Star,
    MapPin,
    Users,
    Baby,
    Wifi,
    Phone,
    Mail,
    Clock
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "../components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../components/ui/carousel";
import { Label } from "../components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { getHotelById } from "../api/hotels.api";
import { DatePicker } from "../components/ui/DatePicker";
import { useAppContext } from "../contexts/AppContext";
import HotelDetailsSkeleton from "../components/Skeletons/HotelDetailsSkeleton";
import { facilityIcons } from "../config/constants";
import { useSearchContext } from "../contexts/SearchContext";
import HotelBookingConfirmationDialog from "../components/models/HotelBookingConfirmationModel";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";

export const HotelDetails = () => {
    const { id } = useParams();

    const { currency, showToast } = useAppContext();
    const { isLoggedIn } = useUser();
    const { checkIn, checkOut, setSearchValues } = useSearchContext();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [adultsCount, setAdultsCount] = useState<number | undefined>(undefined);
    const [childrenCount, setChildrenCount] = useState<number | undefined>(undefined);

    const setCheckInDate = (date: Date | undefined) => {
        setSearchValues({ checkIn: date });
    };

    const setCheckOutDate = (date: Date | undefined) => {
        setSearchValues({ checkOut: date });
    };

    const { data: hotel, isLoading } = useQuery({
        queryKey: ["hotel", id],
        queryFn: () => getHotelById(id as string),
        enabled: !!id,
    });

    const handleReservation = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight

        console.log(checkIn) 

        const differenceInDays = (start: Date, end: Date) => {
            const msPerDay = 1000 * 60 * 60 * 24;
            return Math.round((end.getTime() - start.getTime()) / msPerDay);
        };

        // Login check
        if (!isLoggedIn) {
            showToast({
                type: "error",
                message: "You must be logged in to make a reservation.",
            });
            return;
        }

        // Required date checks
        if (!checkIn) {
            showToast({ type: "error", message: "Please select a check-in date." });
            return;
        }
        if (!checkOut) {
            showToast({ type: "error", message: "Please select a check-out date." });
            return;
        }

        // Past date check
        if (checkIn < today) {
            showToast({
                type: "error",
                message: "Check-in date cannot be in the past.",
            });
            return;
        }

        // Check-in before check-out
        if (checkOut <= checkIn) {
            showToast({
                type: "error",
                message: "Check-out date must be after check-in date.",
            });
            return;
        }

        const stayLength = differenceInDays(checkIn, checkOut);

        // Minimum stay: 1 night
        if (stayLength < 1) {
            showToast({
                type: "error",
                message: "Minimum stay is 1 night.",
            });
            return;
        }

        // Maximum stay: 30 nights
        if (stayLength > 30) {
            showToast({
                type: "error",
                message: "Maximum stay allowed is 30 nights.",
            });
            return;
        }

        // Minimum lead time before check-in (optional: here 1 day)
        if (differenceInDays(today, checkIn) < 1) {
            showToast({
                type: "error",
                message: "Bookings must be made at least 1 day in advance.",
            });
            return;
        }

        // Blackout dates (example list)
        const blackoutDates = ["2025-08-20", "2025-12-25"];
        const checkInISO = checkIn.toISOString().split("T")[0];
        if (blackoutDates.includes(checkInISO)) {
            showToast({
                type: "error",
                message: "Selected check-in date is not available.",
            });
            return;
        }

        // Guest count validation
        if (!adultsCount || adultsCount <= 0) {
            showToast({
                type: "error",
                message: "Please select at least one adult.",
            });
            return;
        }
        if (childrenCount === undefined || childrenCount < 0) {
            showToast({
                type: "error",
                message: "Please select the number of children (0 or more).",
            });
            return;
        }

        // Passed all validations → open dialog
        setIsDialogOpen(true);
    };



    if (isLoading || !hotel) {
        return <HotelDetailsSkeleton />;
    }


    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <div className="space-y-8">
                {/* Image Carousel */}
                <div className="relative">
                    <Carousel className="w-full">
                        <CarouselContent>
                            {hotel.data.images.map((image: string, index: number) => (
                                <CarouselItem key={index}>
                                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                                        <img
                                            src={image}
                                            alt={`${hotel.data.name} image ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm" />
                        <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm" />
                    </Carousel>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Hotel Information */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header Section */}
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                                        {hotel.data.name}
                                    </h1>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="h-4 w-4 flex-shrink-0" />
                                        <span className="text-sm sm:text-base">
                                            {hotel.data.city}, {hotel.data.country}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${i < hotel.data.starRating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "fill-muted text-muted"
                                                }`}
                                        />
                                    ))}
                                    <span className="ml-2 text-sm font-medium">
                                        {hotel.data.starRating} star
                                    </span>
                                </div>
                            </div>

                            {/* Hotel Type and Capacity */}
                            <div className="flex flex-wrap gap-3">
                                <Badge variant="secondary" className="text-sm">
                                    {hotel.data.type}
                                </Badge>
                                <Badge variant="outline" className="text-sm">
                                    <Users className="h-3 w-3 mr-1" />
                                    {hotel.data.adultsCount} adults
                                </Badge>
                                {
                                    <Badge variant="outline" className="text-sm">
                                        <Baby className="h-3 w-3 mr-1" />
                                        {hotel.data.childCount} children
                                    </Badge>
                                }
                            </div>
                        </div>

                        <Separator />

                        {/* Description */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">About this hotel</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {hotel.data.description}
                            </p>
                        </div>

                        <Separator />

                        {/* Facilities */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Amenities & Facilities</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {hotel.data.facilities.map((facility: string) => (
                                    <div
                                        key={facility}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                    >
                                        {facilityIcons[facility] || <Wifi className="h-4 w-4" />}
                                        <span className="text-sm font-medium">{facility}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Booking & Contact */}
                    <div className="space-y-6">
                        {/* Booking Card */}
                        <Card className="">
                            <CardHeader className="pb-4">
                                <div className="flex items-baseline gap-2">
                                    <CardTitle className="text-2xl">
                                        {hotel.data.pricePerNight.toFixed(2)}{currency}
                                    </CardTitle>
                                    <CardDescription>per night</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Date Selection */}
                                <div className="flex gap-3">
                                    <div className=" flex-1 space-y-2">
                                        <DatePicker
                                            onChange={setCheckInDate}
                                            value={checkIn}
                                            label="Check-in Date"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <DatePicker
                                            onChange={setCheckOutDate}
                                            label="Check-out Date"
                                            value={checkOut}
                                        />
                                    </div>
                                </div>

                                {/* Guest Selection */}
                                <div className="flex gap-3">
                                    <div className=" flex-1 space-y-2">
                                        <Label className="text-sm font-medium">Adults</Label>
                                        <Select
                                            onValueChange={(value) => setAdultsCount(Number(value))}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Adults" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: hotel.data.adultsCount }, (_, i) => (
                                                    <SelectItem key={i} value={String(i + 1)}
                                                    >
                                                        {i + 1}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Label className="text-sm font-medium">Children</Label>
                                        <Select
                                            onValueChange={(value) => setChildrenCount(Number(value))}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Children" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: hotel.data.childCount + 1 }, (_, i) => (
                                                    <SelectItem key={i} value={String(i)}>
                                                        {i === 0 ? "0" : i}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Separator />

                                {/* Price Breakdown */}

                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={handleReservation}
                                    size="lg" className="w-full">
                                    <Clock className="h-4 w-4 mr-2" />
                                    Reserve Now
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Contact Information Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Phone className="h-5 w-5" />
                                    Contact Hotel
                                </CardTitle>
                                <CardDescription>
                                    Get in touch with the hotel directly
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="text-sm leading-relaxed">
                                        {hotel.data.contactInfo}
                                    </p>
                                </div>
                                
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Booking Confirmation Dialog */}
            <HotelBookingConfirmationDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                hotel={hotel.data}
                checkInDate={checkIn}
                checkOutDate={checkOut}
                adultsCount={adultsCount}
                childrenCount={childrenCount}
            />
        </div>
    );
};