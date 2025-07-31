import { z } from "zod";

export const registerSchema = z
    .object({
        firstName: z.string().min(2, "Too short").max(20, "Too long").nonempty("Required"),
        lastName: z.string().min(2, "Too short").max(20, "Too long").nonempty("Required"),
        email: z.string().email("Invalid email"),
        password: z.string().min(6, "Too short").max(20, "Too long").nonempty("Required"),
        confirmPassword: z.string().min(6, "Too short").max(20, "Too long").nonempty("Required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type IRegisterFormData = z.infer<typeof registerSchema>;


export const loginSchema = z
    .object({
        email: z.string().email("Invalid email"),
        password: z.string().min(6, "Too short").max(20, "Too long").nonempty("Required"),
    })

export type ILoginFormData = z.infer<typeof loginSchema>;




export const addHotelSchema = z.object({
    name: z.string().min(2, "Hotel name must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    starRating: z.number().min(1).max(5),
    type: z.string("Please select a hotel type").nonempty("Please select a hotel type"),
    adultsCount: z.number().min(1),
    childCount: z.number().min(0),
    facilities: z.array(z.string()).min(1, "Please select at least one facility"),
    pricePerNight: z.number().min(1),
    contactInfo: z.string().min(10, "Contact info must be at least 10 characters"),
    images: z.array(z.file()).min(2, "Please upload at least two images"),
});

export type IAddHotelFormData = z.infer<typeof addHotelSchema>;

