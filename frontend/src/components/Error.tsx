import { CircleX } from "lucide-react";

type ErrorProps = {
    message: string;
}

const Error = ({ message }: ErrorProps) => {
    return (
        <div className="container flex items-center justify-center mt-16 py-12 min-h-[calc(100vh-4rem)]">
            <div className="flex flex-col items-center text-center">
                <CircleX className="h-16 w-16 text-red-600 mb-4" />
                <h1 className="text-3xl font-bold text-red-600">{message}</h1>
            </div>
        </div>
    )
}

export default Error