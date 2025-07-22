import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, type ILoginFormData } from "../validation/validation";
import { useForm } from "react-hook-form";
import * as apiClient from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "../contexts/AppContext";
import ButtonLoading from "../components/ButtonLoading";


function Login() {

    const { showToast } = useAppContext();
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ILoginFormData>({
        mode: "onChange",
        resolver: zodResolver(loginSchema)
    })

    const mutation = useMutation({
        mutationFn: apiClient.login,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
            showToast({
                type: "success",
                message: "logged in successfully!"
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

    const onsubmit = async (data: ILoginFormData) => {
        mutation.mutate(data);
    }

    return (
        <div className=" flex items-center justify-center mt-16 min-h-[calc(100vh-4rem)]">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Login in to your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
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
                        {/* <Button disabled={isSubmitting} type="submit" className="w-full">
                            Sign in
                        </Button> */}
                        <ButtonLoading
                            isLoading={mutation.isPending}
                            type="submit"
                            className="w-full"
                            text="Login"
                        />
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-medium text-primary hover:text-primary/80">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;