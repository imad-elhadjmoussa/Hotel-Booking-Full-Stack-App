import { Skeleton } from "../ui/skeleton";

const HotelSearchCardSkeleton = () => {
    return (
        <div className="border rounded-lg shadow-sm overflow-hidden">
            <div className="h-48 bg-gray-100 overflow-hidden">
                <Skeleton className="w-full h-full" />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-6 w-3/4" />
                    <div className="flex items-center">
                        <Skeleton className="w-4 h-4 rounded-full" />
                        <Skeleton className="ml-1 h-4 w-4" />
                    </div>
                </div>
                <div className="space-y-2 mb-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </div>
        </div>
    );
};

export default HotelSearchCardSkeleton;