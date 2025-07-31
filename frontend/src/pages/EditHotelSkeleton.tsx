import { Skeleton } from "../components/ui/skeleton"


function EditHotelSkeleton() {
    return (
        <div className="flex container items-center justify-center mt-16 py-12 min-h-[calc(100vh-4rem)]">
            <div className="w-full max-w-3xl">
                <div className="space-y-8 p-6">
                    {/* Card Header */}
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-[200px] mx-auto" />
                        <Skeleton className="h-4 w-[300px] mx-auto" />
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        {/* First Row - Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-[80px]" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-32 w-full" />
                        </div>

                        {/* Facilities */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[80px]" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        {/* Images Upload */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[100px]" />
                            <div className="grid grid-cols-3 gap-4">
                                {[...Array(3)].map((_, i) => (
                                    <Skeleton key={i} className="h-32 w-full rounded-lg" />
                                ))}
                            </div>
                            <Skeleton className="h-4 w-[250px]" />
                        </div>

                        {/* Submit Button */}
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditHotelSkeleton