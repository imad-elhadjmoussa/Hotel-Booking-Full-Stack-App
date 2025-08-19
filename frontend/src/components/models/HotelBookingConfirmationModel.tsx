import { useMutation } from "@tanstack/react-query";
import { useUser } from "../../contexts/UserContext";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { createBooking } from "../../api/booking.api";
import { useAppContext } from "../../contexts/AppContext";
import type { Booking, Hotel } from "../../types/types";
import { Loader2Icon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { useMemo } from "react";

type HotelBookingConfirmationProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    hotel: Hotel;
    checkInDate: Date;
    checkOutDate: Date;
    adultsCount: number | undefined;
    childrenCount: number | undefined;
};

const calculateNights = (checkIn: Date, checkOut: Date): number => {
    // Calculate the difference in milliseconds
    const diffTime = checkOut.getTime() - checkIn.getTime();
    // Convert milliseconds to days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

const HotelBookingConfirmationDialog = ({
    open,
    onOpenChange,
    hotel,
    checkInDate,
    checkOutDate,
    adultsCount,
    childrenCount,
}: HotelBookingConfirmationProps) => {
    const { user } = useUser();
    const { showToast, currency } = useAppContext();

    // Calculate number of nights using useMemo to optimize performance
    const numberOfNights = useMemo(() => {
        return calculateNights(checkInDate, checkOutDate);
    }, [checkInDate, checkOutDate]);

    // Calculate total amount using useMemo
    const totalAmount = useMemo(() => {
        return numberOfNights * hotel.pricePerNight;
    }, [numberOfNights, hotel.pricePerNight]);

    const { mutate,isPending } = useMutation({
        mutationFn: createBooking,
        onSuccess: () => {
            showToast({
                type: "success",
                message: "Booking created successfully",
            });
            // onOpenChange(false);
        },
        onError: (error) => {
            showToast({
                type: "error",
                message: error.message,
            });
        },
    });

    const handleConfirmBooking = () => {
        const bookingData: Booking = {
            hotelId: hotel._id,
            checkInDate,
            checkOutDate,
            adultsCount,
            childrenCount,
            totalCost: totalAmount,
        }
        mutate(bookingData);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-xs">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-sm font-semibold">Booking Confirmation</AlertDialogTitle>
                    <div className="space-y-3 py-2">
                        <div className="space-y-1.5">
                            <div>
                                <Label className="text-xs text-muted-foreground">Full Name</Label>
                                <div className="text-sm py-1 px-2 border rounded bg-muted/50">{`${user?.firstName} ${user?.lastName}`}</div>
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Hotel Name</Label>
                                <div className="text-sm py-1 px-2 border rounded bg-muted/50">{hotel.name}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label className="text-xs text-muted-foreground">Check-in</Label>
                                <div className="text-sm py-1 px-2 border rounded bg-muted/50">
                                    {checkInDate.toLocaleDateString('en-GB')}
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Check-out</Label>
                                <div className="text-sm py-1 px-2 border rounded bg-muted/50">
                                    {checkOutDate.toLocaleDateString('en-GB')}
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Adults</Label>
                                <div className="text-sm py-1 px-2 border rounded bg-muted/50">{adultsCount}</div>
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Children</Label>
                                <div className="text-sm py-1 px-2 border rounded bg-muted/50">{childrenCount}</div>
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Nights</Label>
                                <div className="text-sm py-1 px-2 border rounded bg-muted/50">
                                    {numberOfNights} {numberOfNights === 1 ? 'night' : 'nights'}
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Price per night</Label>
                                <div className="text-sm py-1 px-2 border rounded bg-muted/50">
                                    {totalAmount.toFixed(2)} {currency}
                                </div>
                            </div>
                        </div>
                        <div className="pt-2 border-t">
                            <div className="flex justify-between items-center">
                                <Label className="text-xs font-medium">Total Amount</Label>
                                <div className="text-sm font-medium">
                                    {totalAmount.toFixed(2)} {currency}
                                </div>
                            </div>
                        </div>
                    </div>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex-row justify-end gap-2 pt-2">
                    <AlertDialogCancel className="h-8 px-3 text-xs">Back</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirmBooking}
                        disabled={isPending}
                        className="h-8 px-3 text-xs"
                    >
                        {isPending && <Loader2Icon className="animate-spin h-3 w-3 mr-1" />}
                        {isPending ? "Processing..." : "Confirm"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default HotelBookingConfirmationDialog;