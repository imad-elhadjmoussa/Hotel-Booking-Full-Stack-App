import { useUser } from "../contexts/UserContext";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth-user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import ButtonLoading from "./ButtonLoading";
import { LogOut } from "lucide-react";


interface AuthButtonsProps {
    mobile?: boolean;
}

const AuthButtons = ({ mobile = false }: AuthButtonsProps) => {
    const { isLoggedIn, loading } = useUser();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        mutate,
        isPending: isLoading,
    } = useMutation({
        mutationFn: logout,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
            showToast({ message: "Logout Successful", type: "success" });
            navigate("/");
        },
        onError: (error: Error) => {
            // Handle error during logout
            showToast({ message: error.message, type: "error" });
        }
    });

    if (loading) {
        return mobile ? (
            <div className="flex flex-col gap-2">
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
            </div>
        ) : (
            <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-24 rounded-md" />
            </div>
        );
    }

    if (mobile) {
        return (
            <div className="flex flex-col gap-2">
                {isLoggedIn ? (
                    <>
                        <Button size="sm" className="w-full" asChild>
                            <Link to="/my-bookings">My Bookings</Link>
                        </Button>
                        <Button size="sm" className="w-full" asChild>
                            <Link to="/my-hotels">My Hotels</Link>
                        </Button>
                        <ButtonLoading
                            onClick={() => mutate()}
                            isLoading={isLoading}
                            text="Logout"
                            variant="destructive"
                            size="sm"
                            icon={<LogOut />}
                        />
                    </>
                ) : (
                    <>
                        <Button size="sm" className="w-full" asChild>
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link to="/signup">Sign Up</Link>
                        </Button>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            {isLoggedIn ? (
                <>
                    <Button size="sm" asChild>
                        <Link to="/my-bookings">My Bookings</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link to="/my-hotels">My Hotels</Link>
                    </Button>
                    <ButtonLoading
                        onClick={() => mutate()}
                        isLoading={isLoading}
                        text="Logout"
                        variant="destructive"
                        icon={<LogOut />}
                        size="sm"
                    />
                </>
            ) : (
                <>
                    <Button size="sm" asChild>
                        <Link to="/login">Login</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                        <Link to="/signup">Sign Up</Link>
                    </Button>
                </>
            )}
        </div>
    );
};





export default AuthButtons;