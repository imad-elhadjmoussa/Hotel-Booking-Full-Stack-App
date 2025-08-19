import { Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
// import { Slider } from "../components/ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useSearchContext } from "../contexts/SearchContext";
import { useState } from "react";
import { hotelFacilities, hotelTypes } from "../config/constants";


export const SearchFilterCard = () => {
    const {
        adultCount,
        childrenCount,
        setSearchValues,
        starRating: sr,
        hotelTypes: ht,
        facilities
    } = useSearchContext();

    const [starRating, setStarRating] = useState<number>(sr);
    const [selectedTypes, setSelectedTypes] = useState<string[] | undefined>(ht);
    const [selectedFacilities, setSelectedFacilities] = useState<string[] | undefined>(facilities);

    const handleTypeToggle = (type: string) => {
        if (!selectedTypes) {
            setSelectedTypes([type]);
            setSearchValues({ hotelTypes: [type] });
            return;
        }
        const newTypes = selectedTypes.includes(type)
            ? selectedTypes.filter(t => t !== type)
            : [...selectedTypes, type];
        setSelectedTypes(newTypes);
        console.log("Selected hotel types:", newTypes);
        setSearchValues({ hotelTypes: newTypes });
    };

    const handleFacilityToggle = (facility: string) => {
        if (!selectedFacilities) {
            setSelectedFacilities([facility]);
            setSearchValues({ facilities: [facility] });
            return;
        }
        const newFacilities = selectedFacilities.includes(facility)
            ? selectedFacilities.filter(f => f !== facility)
            : [...selectedFacilities, facility];
        setSelectedFacilities(newFacilities);
        setSearchValues({ facilities: newFacilities });
    };

    const handleGuestChange = (adults: number, children: number) => {
        setSearchValues({ adultCount: adults, childrenCount: children });
    };

    // const handlePriceChange = (range: [number, number]) => {
    //     setPriceRange(range);
    //     setSearchValues({ priceRange: range });
    // };

    const resetFilters = () => {
        setStarRating(0);
        setSelectedTypes([]);
        setSelectedFacilities([]);
        // setPriceRange([0, 1000]);
        setSearchValues({
            adultCount: 1,
            childrenCount: 0,
            facilities: [],
            hotelTypes: [],
            priceRange: [0, 1000]
        });
    };

    return (
        <Card className="w-full ">
            <CardHeader>
                <CardTitle className="text-lg">Filter Hotels</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                {/* Star Rating */}
                <div className="space-y-2">
                    <Label>Star Rating</Label>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <Button
                                key={rating}
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    setStarRating(rating);
                                    setSearchValues({ starRating: rating });
                                }}
                                className={`h-8 w-8 p-0 rounded-full hover:bg-transparent ${starRating >= rating ? "text-yellow-400" : "text-muted-foreground"
                                    }`}
                            >
                                <Star className="w-5 h-5 fill-current" />
                            </Button>
                        ))}
                    </div>
                </div>

                <Separator />

                {/* Guests */}
                <div className="space-y-4">
                    <Label>Guests</Label>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm">Adults</Label>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleGuestChange(Math.max(1, adultCount - 1), childrenCount)}
                                >
                                    -
                                </Button>
                                <span className="w-6 text-center">{adultCount}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleGuestChange(adultCount + 1, childrenCount)}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label className="text-sm">Children</Label>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleGuestChange(adultCount, Math.max(0, childrenCount - 1))}
                                >
                                    -
                                </Button>
                                <span className="w-6 text-center">{childrenCount}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleGuestChange(adultCount, childrenCount + 1)}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Hotel Types */}
                <div className="space-y-3">
                    <Label>Hotel Types</Label>
                    <div className="space-y-3">
                        {hotelTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`type-${type}`}
                                    checked={selectedTypes?.includes(type)}
                                    onCheckedChange={() => handleTypeToggle(type)}
                                />
                                <Label htmlFor={`type-${type}`} className="text-sm font-normal">
                                    {type}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                {/* Facilities */}
                <div className="space-y-3">
                    <Label>Facilities</Label>
                    <div className="space-y-3">
                        {hotelFacilities.map((facility) => (
                            <div key={facility} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`facility-${facility}`}
                                    checked={selectedFacilities?.includes(facility)}
                                    onCheckedChange={() => handleFacilityToggle(facility)}
                                />
                                <Label htmlFor={`facility-${facility}`} className="text-sm font-normal">
                                    {facility}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Price Range */}
                {/* <div className="space-y-3">
                    <Label>Price Range</Label>
                    <Slider
                        min={0}
                        max={1000}
                        step={10}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        minStepsBetweenThumbs={1}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div> */}


                <Separator />

                {/* Reset Button */}
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={resetFilters}
                >
                    Reset Filters
                </Button>
            </CardContent>
        </Card>
    );
};