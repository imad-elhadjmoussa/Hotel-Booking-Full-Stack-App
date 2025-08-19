import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchContext } from "../contexts/SearchContext";
import { DatePicker } from "./ui/DatePicker";

const SearchBar = () => {
    const { setSearchValues, destination: dest, checkIn, checkOut } = useSearchContext();
    const [checkInDate, setCheckInDate] = useState<Date | undefined>(checkIn);
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(checkOut);
    const [destination, setDestination] = useState(dest);

    const handleSearch = () => {
        setSearchValues({
            checkIn: checkInDate || new Date(),
            checkOut: checkOutDate || new Date(),
            destination,
        });
    };



    return (

        <Card className="p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* Destination */}
                <div className="">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                        id="destination"
                        type="text"
                        placeholder="Where are you going?"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>

                {/* Check-in */}
                <div className="">
                    <DatePicker
                        value={checkInDate}
                        onChange={setCheckInDate}
                        label="Check-in"
                    />
                </div>

                {/* Check-out */}
                <div className="">
                    <DatePicker
                        value={checkOutDate}
                        onChange={setCheckOutDate}
                        label="Check-out"
                    />
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                    <Link to="/search-hotels" className="w-full">
                        <Button className="w-full" onClick={handleSearch}>
                            <Search className="mr-2 h-4 w-4" />
                            Search Hotels
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
        // </div>
    );
};

export default SearchBar;