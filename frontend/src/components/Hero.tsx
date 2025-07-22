import SearchFilterCard from "./SearchFilterCard";

const HeroSection = () => {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center ">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Luxury hotel"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                    Find Your Perfect Stay
                </h1>
                <p className="text-xl text-white/90 max-w-2xl mb-10">
                    Discover and book exceptional hotels around the world. Unforgettable
                    experiences start here.
                </p>
            </div>

            {/* Search Filter Card */}
            <SearchFilterCard />

        </section>
    );
};

export default HeroSection;