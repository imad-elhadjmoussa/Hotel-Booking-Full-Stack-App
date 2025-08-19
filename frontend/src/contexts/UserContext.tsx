import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api/auth-user.api";
import type { CurrentUser } from "../types/types";

type UserContextType = {
    isLoggedIn: boolean;
    loading: boolean;
    user: CurrentUser | null;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {


    const {
        isLoading,
        isError,
        data
    } = useQuery({
        queryKey: ["currentUser"],
        queryFn: apiClient.getCurrentUser,
        retry: false,
    });

    return (
        <UserContext.Provider value={{
            isLoggedIn: !isError,
            loading: isLoading,
            user: data?.data || null
        }}>
            {children}
        </UserContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};
