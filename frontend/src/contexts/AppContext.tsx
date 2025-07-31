import { createContext, useContext } from "react";
import type { ToastMessage } from "../types/types";
import toast from "react-hot-toast";

type appContextType = {
    showToast: (message: ToastMessage) => void;
    currency: string;
}

const appContext = createContext<appContextType | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const showToast = (message: ToastMessage) => {
        toast[message.type](message.message);
    };

    return (
        <appContext.Provider value={{ showToast, currency: "DA" }}>
            {children}
        </appContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(appContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
}