import { Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Calendar } from "../components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

const SearchFilterCard = () => {
    const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);

    return (
        <div className="absolute bottom-0 left-1/2 w-full max-w-5xl px-4 transform -translate-x-1/2 translate-y-1/2">
            <Card className="p-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Destination */}
                    <div className="space-y-2">
                        <Label htmlFor="destination">Destination</Label>
                        <Input
                            id="destination"
                            type="text"
                            placeholder="Where are you going?"
                        />
                    </div>

                    {/* Check-in */}
                    <div className="space-y-2">
                        <Label>Check-in</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className="w-full justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {checkInDate ? (
                                        format(checkInDate, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={checkInDate}
                                    onSelect={setCheckInDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Check-out */}
                    <div className="space-y-2">
                        <Label>Check-out</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className="w-full justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {checkOutDate ? (
                                        format(checkOutDate, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={checkOutDate}
                                    onSelect={setCheckOutDate}
                                    initialFocus
                                    fromDate={checkInDate}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Search Button */}
                    <div className="flex items-end">
                        <Button className="w-full">
                            <Search className="mr-2 h-4 w-4" />
                            Search Hotels
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SearchFilterCard;