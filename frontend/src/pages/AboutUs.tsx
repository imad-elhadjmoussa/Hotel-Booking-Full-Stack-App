
import hotelSelection from "./../assets/hotel-selection.jpg"
import ourStory from "./../assets/our-story.jpg"

export default function AboutUs() {
    return (
        <div className="container mt-20 min-h-[calc(100vh-4rem)] mb-10">
            {/* Header with hero image */}
            <div className="text-center mb-12">
                <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
                    <img
                        src={hotelSelection}
                        alt="Hotel lobby with welcoming atmosphere"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white">About Us</h1>
                    </div>
                </div>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Welcome to <span className="font-semibold">HotelBooking</span>, your
                    trusted partner in finding the perfect stay. Our mission is to make
                    travel simple, comfortable, and memorable.
                </p>
            </div>

            {/* Mission / Story with image */}
            <div className="flex flex-col md:flex-row gap-8 mb-10 items-center">
                <div className="md:w-1/2">
                    <img
                        src={ourStory}
                        alt="Team working together"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover h"
                    />
                </div>
                <div className="md:w-1/2">
                    <div>
                        <h1 className=" text-4xl font-bold mb-4">Our Story</h1>
                    </div>
                    <div>
                        <p className="text-muted-foreground ">
                            Founded with a passion for travel and hospitality, HotelBooking
                            started as a small project and grew into a platform connecting
                            travelers with quality stays worldwide. We believe that every trip
                            should be seamless, and every guest deserves the best service.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}