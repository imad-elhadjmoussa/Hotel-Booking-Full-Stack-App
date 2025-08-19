import { Separator } from '@radix-ui/react-select'
import { Skeleton } from '../ui/skeleton'

const HotelDetailsSkeleton = () => {
    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <div className="space-y-8">
                <Skeleton className="h-96 w-full rounded-xl" />
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-3/4" />
                            <Skeleton className="h-6 w-1/2" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/6" />
                            </div>
                        </div>
                        <Separator />
                        <Skeleton className="h-32 w-full" />
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-48 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelDetailsSkeleton