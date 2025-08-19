import {
    ArrowUpRight,
    Facebook,
    Instagram,
    Linkedin,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container pt-12 ">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <img
                                src="./logo.png"
                                alt="HotelBooking Logo"
                                className="size-7"
                            />
                            <span className="text-xl font-bold tracking-tight">HotelBooking</span>
                        </Link>
                        <p className="text-muted-foreground">
                            Discover luxury stays and unforgettable experiences around the world.
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                    <Facebook className="h-5 w-5" />
                                </a>
                            </Button>

                            <Button variant="ghost" size="icon">
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                    <Instagram className="h-5 w-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon">
                                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Quick Links</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link to="/" className="hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/search-hotels" className="hover:text-primary transition-colors">
                                    Hotels
                                </Link>
                            </li>

                            <li>
                                <Link to="/about-us" className="hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact-us" className="hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Support</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link to="/contact-us" className="hover:text-primary transition-colors">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact-us" className="hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>

                            <li>
                                <Link to="/about-us" className="hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Newsletter</h4>
                        <p className="text-muted-foreground">
                            Subscribe to get special offers and updates
                        </p>
                        <div className="flex space-x-2">
                            <Input
                                type="email"
                                placeholder="Your email"
                                className="flex-1"
                            />
                            <Button variant="default">Subscribe</Button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t py-2 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} HotelBooking. All rights reserved.
                </div>
            </div>
            <div className=" flex justify-center gap-2 py-2 bg-gray-900 w-full text-center text-white ">
                Developed by Imad Eddine Elhadjmoussa More About Me:
                <a href="https://imad-elhadjmoussa.github.io/imad-eddine-elhadjmouss-info/" target="_blank" rel="noopener noreferrer">
                    <span className=" flex items-center gap-2 px-3 bg-white text-gray-900 font-bold">
                        Contact Me  <ArrowUpRight className=" size-4 " />
                    </span>
                </a>
            </div>
        </footer>
    );
}

export default Footer;