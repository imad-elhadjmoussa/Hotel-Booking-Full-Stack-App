import { Loader2Icon, type LucideProps } from "lucide-react"
import { Button } from "../components/ui/button"
import type { UseMutateFunction } from "@tanstack/react-query";
import type { ReactElement } from "react";

type ButtonLoadingProps = {
    size?: "sm" | "lg" | "default" | "icon" | null | undefined,
    text: string,
    isLoading: boolean,
    variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
    onClick?: UseMutateFunction<unknown, Error, void, unknown>
    type?: "button" | "submit" | "reset" | undefined
    className?: string | undefined
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> | ReactElement | null | undefined

};

function ButtonLoading({
    text,
    isLoading,
    onClick: click = () => { },
    size = "default",
    variant = "default",
    type = "button",
    className = "",
    icon
}: ButtonLoadingProps) {
    return (
        <Button
            className={`${className}`}
            size={size}
            disabled={isLoading}
            variant={variant}
            type={type}
            onClick={() => { click() }}
        >
            {isLoading ? (
                <>
                    <Loader2Icon className="animate-spin" />
                    {icon}
                    {text}
                </>
            ) : (
                <>
                    {icon} {text}
                </>
            )}
        </Button>
    )
}

export default ButtonLoading;

