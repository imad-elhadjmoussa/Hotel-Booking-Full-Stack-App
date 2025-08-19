import { useSearchContext } from "../contexts/SearchContext";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";

export const SortBy = () => {
    const { setSearchValues, sortOption } = useSearchContext();

    const handleSortChange = (value: "starRating" | "pricePerNightAsc" | "pricePerNightDesc") => {
        setSearchValues({ sortOption: value });
    };

    return (
        <Select

            value={sortOption}
            onValueChange={handleSortChange}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="starRating">Star Rating</SelectItem>
                <SelectItem value="pricePerNightAsc">Price (Low to High)</SelectItem>
                <SelectItem value="pricePerNightDesc">Price (High to Low)</SelectItem>
            </SelectContent>
        </Select>
    );
};