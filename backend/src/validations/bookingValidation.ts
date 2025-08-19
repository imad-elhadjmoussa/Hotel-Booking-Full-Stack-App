import { Types } from "mongoose";

export interface BookingValidationParams {
    checkInDate: string | Date;
    checkOutDate: string | Date;
    adultsCount: number;
    childrenCount: number;
}

export const validateBooking = ({
    checkInDate,
    checkOutDate,
    adultsCount,
    childrenCount
}: BookingValidationParams): string | null => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const differenceInDays = (start: Date, end: Date) => {
        const msPerDay = 1000 * 60 * 60 * 24;
        return Math.round((end.getTime() - start.getTime()) / msPerDay);
    };

    // 3. Required dates
    if (!checkInDate) return "Check-in date is required.";
    if (!checkOutDate) return "Check-out date is required.";

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
        return "Invalid date format.";
    }

    // 4. Past date
    if (checkIn < today) return "Check-in date cannot be in the past.";

    // 5. Logical order
    if (checkOut <= checkIn) return "Check-out date must be after check-in date.";

    const stayLength = differenceInDays(checkIn, checkOut);

    // 6. Min stay
    if (stayLength < 1) return "Minimum stay is 1 night.";

    // 7. Max stay
    if (stayLength > 30) return "Maximum stay allowed is 30 nights.";

    // 8. Lead time (1 day)
    if (differenceInDays(today, checkIn) < 1) {
        return "Bookings must be made at least 1 day in advance.";
    }

    // 9. Example blackout dates
    const blackoutDates = ["2025-08-20", "2025-12-25"];
    const checkInISO = checkIn.toISOString().split("T")[0];
    if (blackoutDates.includes(checkInISO)) {
        return "Selected check-in date is not available.";
    }

    // 10. Guest counts
    if (!adultsCount || adultsCount <= 0) return "Please select at least one adult.";
    if (childrenCount === undefined || childrenCount < 0) {
        return "Please select the number of children (0 or more).";
    }

    return null; 
};
