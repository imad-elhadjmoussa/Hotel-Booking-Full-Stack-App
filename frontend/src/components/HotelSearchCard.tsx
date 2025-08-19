import { Hotel as HotelIcon, Star } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import type { Hotel } from "../types/types";
import { useAppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";

export const HotelSearchCard = ({ hotel }: { hotel: Hotel }) => {
    const { currency } = useAppContext();

    return (
        <Card className="group p-0 h-full flex flex-col overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Image */}
            <div className="relative h-48 overflow-hidden ">
                {hotel.images?.[0] ? (
                    <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">
                            No image available
                        </span>
                    </div>
                )}

                {/* Rating Badge in top-right */}
                <Badge
                    variant="secondary"
                    className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm flex items-center gap-1 px-2 py-0.5"
                >
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    <span className="text-xs font-medium">{hotel.starRating}</span>
                </Badge>
            </div>

            {/* Content */}
            <CardContent className="p-5 pt-0  flex-grow flex flex-col">
                {/* Title */}
                <h3 className="text-lg font-semibold tracking-tight line-clamp-1 mb-1">
                    {hotel.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                    {hotel.description || "No description available"}
                </p>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-baseline">
                        <span className="text-2xl font-bold">
                            {hotel.pricePerNight?.toFixed(2) || "0.00"}
                        </span>
                        <span className="ml-1 text-sm text-muted-foreground">
                            {currency}
                        </span>
                    </div>
                    <Link to={`/hotel/${hotel._id}`} >
                        <Button size="sm" >
                            {/* icon form lucid */}
                            <HotelIcon className="h-4 w-4 mr-1" />
                            Book now
                        </Button>
                    </Link>
                </div>
                <span className="mt-1 text-xs text-muted-foreground">per night</span>
            </CardContent>
        </Card>
    );
};
