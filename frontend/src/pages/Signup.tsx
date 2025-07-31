import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema, type IRegisterFormData } from "../validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api/auth-user.api";
import { useAppContext } from "../contexts/AppContext";
import ButtonLoading from "../components/ButtonLoading";


function Signup() {

    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IRegisterFormData>({
        mode: "onChange",
        resolver: zodResolver(registerSchema)
    });

    const mutation = useMutation({
        mutationFn: apiClient.register,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
            showToast({
                type: "success",
                message: "Signup successful!"
            });
            navigate("/");
            reset();
        },
        onError: (error: Error) => {
            showToast({
                type: "error",
                message: error.message
            });
        },
    });

    const onSubmit = async (data: IRegisterFormData) => {
        mutation.mutate(data);
    };

    return (
        <div className="flex container items-center justify-center mt-16 min-h-[calc(100vh-4rem)] py-5">
            <Card className="w-full md:max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Create a new account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="First Name"
                                    {...register("firstName")}
                                />
                                {errors.firstName && (
                                    <p className="text-sm text-red-500">{errors.firstName.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Last Name"
                                    {...register("lastName")}
                                />
                                {errors.lastName && (
                                    <p className="text-sm text-red-500">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                type="password"
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                        {/* <Button disabled={isSubmitting} type="submit" className="w-full">
                            Sign up
                        </Button> */}
                        <ButtonLoading
                            isLoading={mutation.isPending}
                            type="submit"
                            className="w-full"
                            text="Sign up"
                        />
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Signup;