
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { CardDescription } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function BookingCardSkeleton() {
    return (
        <Card className="overflow-hidden p-0 animate-pulse">
            <div className="flex flex-col lg:flex-row p-5 gap-5">
                {/* Hotel Image Skeleton */}
                <div className="lg:w-90 lg:h-64 h-48 relative overflow-hidden rounded-lg bg-gray-200">
                    <Skeleton className="w-full h-full" />
                    {/* Star Rating Skeleton */}
                    <div className="absolute top-3 left-3">
                        <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                </div>

                {/* Booking Details Skeleton */}
                <div className="flex-1 flex flex-col space-y-4">
                    <CardHeader className="p-0 space-y-2">
                        <CardTitle>
                            <Skeleton className="h-6 w-3/4" />
                        </CardTitle>
                        <CardDescription>
                            <div className="flex items-center">
                                <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-gray-100 p-2 rounded-lg space-y-2">
                                    <div className="flex items-center">
                                        <Skeleton className="h-4 w-4 mr-2" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                    <Skeleton className="h-5 w-full" />
                                </div>
                            ))}
                        </div>
                    </CardContent>

                    <CardFooter className="p-0 mt-5 md:mt-0">
                        <div className="flex justify-between items-center w-full">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-7 w-28" />
                            </div>
                            
                        </div>
                    </CardFooter>
                </div>
            </div>
        </Card>
    );
}