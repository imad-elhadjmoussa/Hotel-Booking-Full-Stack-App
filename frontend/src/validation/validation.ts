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

