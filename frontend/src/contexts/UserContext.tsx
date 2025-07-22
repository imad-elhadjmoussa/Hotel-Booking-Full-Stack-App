import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api/api";

type UserContextType = {
    isLoggedIn: boolean;
    loading: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {


    const {
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["validateToken"],
        queryFn: apiClient.validateToken,
        retry: false,
    });

    return (
        <UserContext.Provider value={{
            isLoggedIn: !isError,
            loading: isLoading,
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
