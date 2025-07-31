import { Skeleton } from "../ui/skeleton";

export function HotelCardSkeleton() {
    return (
        <div className="w-full overflow-hidden rounded-2xl border">
            <div className="flex flex-col lg:flex-row">
                {/* Image Gallery Skeleton */}
                <div className="lg:w-1/2 h-80 lg:h-[400px] relative bg-gray-100">
                    <Skeleton className="h-full w-full rounded-none" />
                </div>

                {/* Content Area Skeleton */}
                <div className="lg:w-1/2 flex flex-col p-6">
                    {/* Header Skeleton */}
                    <div className="flex justify-between items-start mb-4">
                        <Skeleton className="h-8 w-3/4 rounded-lg" />
                        <Skeleton className="h-6 w-12 rounded-full" />
                    </div>

                    {/* Location Skeleton */}
                    <div className="flex items-center gap-2 mb-4">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-1/3 rounded-lg" />
                    </div>

                    {/* Type Badge Skeleton */}
                    <Skeleton className="h-6 w-20 rounded-full mb-4" />

                    {/* Description Skeleton */}
                    <div className="space-y-2 mb-6">
                        <Skeleton className="h-4 w-full rounded-lg" />
                        <Skeleton className="h-4 w-5/6 rounded-lg" />
                        <Skeleton className="h-4 w-4/5 rounded-lg" />
                    </div>

                    {/* Facilities Skeleton */}
                    <div className="mb-6">
                        <Skeleton className="h-5 w-24 rounded-lg mb-3" />
                        <div className="grid grid-cols-2 gap-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <Skeleton className="h-10 w-10 rounded-lg" />
                                    <Skeleton className="h-4 w-20 rounded-lg" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price & Booking Skeleton */}
                    <div className="mt-auto border-t pt-5">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <Skeleton className="h-4 w-20 rounded-lg mb-2" />
                                <Skeleton className="h-7 w-24 rounded-lg" />
                            </div>
                            <Skeleton className="h-10 w-28 rounded-lg" />
                        </div>

                        <div className="flex items-center gap-4">
                            <Skeleton className="h-4 w-16 rounded-lg" />
                            <Skeleton className="h-4 w-20 rounded-lg" />
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-40 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}