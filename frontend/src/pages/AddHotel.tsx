// src/pages/hotels/add.tsx
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { addHotelSchema, type IAddHotelFormData } from "../validation/validation";
import { useForm } from "react-hook-form";
import * as apiClient from "../api/hotels.api";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "../contexts/AppContext";
import ButtonLoading from "../components/ButtonLoading";
import { Textarea } from "../components/ui/textarea";
import { Star } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { MultiSelect } from "../components/ui/multi-select";
import { ImageUpload } from "../components/ImageUpload";
import { facilityOptions, hotelTypes } from "../config/constants";

function AddHotel() {
    const { showToast, currency } = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<IAddHotelFormData>({
        mode: "onChange",
        resolver: zodResolver(addHotelSchema),
        defaultValues: {
            name: "",
            country: "",
            city: "",
            description: "",
            type: "", // Reset to empty string
            contactInfo: "",
            starRating: 3,
            adultsCount: 2,
            childCount: 0,
            pricePerNight: 100,
            facilities: [], // Reset MultiSelect
            images: [], // Reset ImageUpload
        }
    });

    const mutation = useMutation({
        mutationFn: apiClient.addHotel,
        onSuccess: async () => {
            // await queryClient.invalidateQueries({ queryKey: ["myHotels"] });
            showToast({
                type: "success",
                message: "Hotel added successfully!"
            });
            // navigate("/my-hotels");
            reset();
            setValue("type", "");
        },
        onError: () => {
            showToast({
                type: "error",
                message: "Failed to add hotel"
            });
        },
    });

    const onSubmit = async (data: IAddHotelFormData) => {
        console.log(data)
        const formData = new FormData();

        // Append all non-file fields
        formData.append('name', data.name);
        formData.append('country', data.country);
        formData.append('city', data.city);
        formData.append('description', data.description);
        formData.append('starRating', data.starRating.toString());
        formData.append('type', data.type);
        formData.append('adultsCount', data.adultsCount.toString());
        formData.append('childCount', data.childCount.toString());
        formData.append('pricePerNight', data.pricePerNight.toString());
        formData.append('contactInfo', data.contactInfo);

        // Better facilities handling (depends on backend)
        data.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        // check if images are at least 2
        if (data.images && Array.isArray(data.images) && data.images.length < 2) {
            showToast({
                type: "error",
                message: "You must upload at least 2 images."
            });
            return;
        } else {
            data.images.forEach((image) => {
                // Only append if it's a File object
                if (image instanceof File) {
                    formData.append(`images`, image);
                }
            });
        }

        mutation.mutate(formData);
    };    

    return (
        <div className="flex container items-center justify-center mt-16 py-12 min-h-[calc(100vh-4rem)]">
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Add New Hotel</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="name">Hotel Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter hotel name"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2 w-full">
                                <Label htmlFor="type">Hotel Type</Label>
                                <Select
                                    onValueChange={(value) => setValue("type", value)}
                                    value={watch("type")} // Ensure this updates when reset
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select hotel type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {hotelTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.type && (
                                    <p className="text-sm text-red-500">{errors.type.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    id="country"
                                    placeholder="Enter country"
                                    {...register("country")}
                                />
                                {errors.country && (
                                    <p className="text-sm text-red-500">{errors.country.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    placeholder="Enter city"
                                    {...register("city")}
                                />
                                {errors.city && (
                                    <p className="text-sm text-red-500">{errors.city.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Star Rating</Label>
                                <StarRating
                                    value={watch("starRating")}
                                    onChange={(value) => setValue("starRating", value)}
                                />
                                {errors.starRating && (
                                    <p className="text-sm text-red-500">{errors.starRating.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pricePerNight">Price Per Night ({currency})</Label>
                                <Input
                                    id="pricePerNight"
                                    type="number"
                                    {...register("pricePerNight", { valueAsNumber: true })}
                                />
                                {errors.pricePerNight && (
                                    <p className="text-sm text-red-500">{errors.pricePerNight.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="adultsCount">Adults Capacity</Label>
                                <Input
                                    id="adultsCount"
                                    type="number"
                                    {...register("adultsCount", { valueAsNumber: true })}
                                />
                                {errors.adultsCount && (
                                    <p className="text-sm text-red-500">{errors.adultsCount.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="childCount">Children Capacity</Label>
                                <Input
                                    id="childCount"
                                    type="number"
                                    {...register("childCount", { valueAsNumber: true })}
                                />
                                {errors.childCount && (
                                    <p className="text-sm text-red-500">{errors.childCount.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Enter hotel description"
                                {...register("description")}
                                className="min-h-[120px]"
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="facilities">Facilities</Label>
                            <MultiSelect
                                options={facilityOptions}
                                selected={watch("facilities")}
                                onChange={(selected) => setValue("facilities", selected)}
                            />
                            {errors.facilities && (
                                <p className="text-sm text-red-500">{errors.facilities.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contactInfo">Contact Information</Label>
                            <Input
                                id="contactInfo"
                                placeholder="Phone number or email"
                                {...register("contactInfo")}
                            />
                            {errors.contactInfo && (
                                <p className="text-sm text-red-500">{errors.contactInfo.message}</p>
                            )}
                        </div>

                        {/* Image upload component would go here */}
                        <div className="space-y-2">
                            <Label>Hotel Images</Label>
                            <ImageUpload
                                value={watch("images")}
                                onChange={(urls) => setValue("images", urls)}
                                maxFiles={6}
                            />

                            {errors.images && (
                                <p className="text-sm text-red-500">{errors.images.message}</p>
                            )}
                            <p className="text-sm text-muted-foreground">
                                Upload at least two image (max 6 images)
                            </p>
                        </div>

                        <ButtonLoading
                            isLoading={mutation.isPending}
                            type="submit"
                            className="w-full"
                            text="Add Hotel"
                        />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default AddHotel;


// src/components/StarRating.tsx


interface StarRatingProps {
    value: number;
    onChange: (value: number) => void;
}

export function StarRating({ value, onChange }: StarRatingProps) {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <Button
                    key={star}
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onChange(star)}
                    className="p-0"
                >
                    <Star
                        className={`h-6 w-6 ${star <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                    />
                </Button>
            ))}
        </div>
    );
}