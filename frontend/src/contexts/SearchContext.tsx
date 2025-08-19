import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { SearchOptionsType } from "../types/types";

type SearchState = {
    hotelId: string;
    checkIn: Date;
    checkOut: Date;
    destination: string;
    adultCount: number;
    childrenCount: number;
    facilities?: string[];
    hotelTypes?: string[];
    priceRange?: [number, number];
    starRating: number;
    sortOption?: SearchOptionsType;
    page: number;
};

export type SearchContextType = SearchState & {
    setSearchValues: (values: Partial<SearchState>) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<SearchState>(() => {
        // Load from sessionStorage on first render
        const saved = sessionStorage.getItem("hotelSearch");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return {
                    ...parsed,
                    // Ensure dates are restored as Date objects
                    checkIn: parsed.checkIn ? new Date(parsed.checkIn) : new Date(),
                    checkOut: parsed.checkOut ? new Date(parsed.checkOut) : new Date(),
                };
            } catch {
                console.error("Invalid data in sessionStorage, using defaults");
            }
        }
        // Default state if nothing saved
        return {
            hotelId: "",
            checkIn: new Date(),
            checkOut: new Date(),
            destination: "",
            adultCount: 0,
            childrenCount: 0,
            facilities: [],
            hotelTypes: [],
            starRating: 0,
            sortOption: undefined,
            page: 1
        };
    });

    const setSearchValues = (values: Partial<SearchState>) => {
        setState(prev => ({ ...prev, ...values }));
    };

    // Save to sessionStorage whenever state changes
    useEffect(() => {
        sessionStorage.setItem("hotelSearch", JSON.stringify(state));
    }, [state]);

    return (
        <SearchContext.Provider value={{ ...state, setSearchValues }}>
            {children}
        </SearchContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearchContext must be used within a SearchContextProvider");
    }
    return context;
};
