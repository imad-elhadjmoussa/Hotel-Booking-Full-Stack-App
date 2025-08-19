import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function NewestSection() {
    return (
        <section className="w-full">
            <div className="container mx-auto px-4 text-center space-y-6">
                {/* Section Header */}
                <div className="max-w-2xl mx-auto space-y-3">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                         Never miss a deal
                    </h2>
                    <p className="text-muted-foreground">
                        Subscribe to our newsletter for exclusive hotel offers and travel inspiration delivered to your inbox.
                    </p>
                </div>

                {/* Subscription Form */}
                <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1"
                        required
                    />
                    <Link to="/login">
                        <Button type="submit" className="w-full sm:w-auto">
                            Subscribe
                        </Button>
                    </Link>
                </form>
            </div>
        </section>
    );
}
