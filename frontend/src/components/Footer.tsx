import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container py-12 ">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Hotel Haven</h3>
                        <p className="text-muted-foreground">
                            Discover luxury stays and unforgettable experiences around the world.
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon">
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Twitter className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Instagram className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Linkedin className="h-5 w-5" />
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
                                <Link to="/hotels" className="hover:text-primary transition-colors">
                                    Hotels
                                </Link>
                            </li>
                            <li>
                                <Link to="/deals" className="hover:text-primary transition-colors">
                                    Special Deals
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Support</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link to="/faq" className="hover:text-primary transition-colors">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="hover:text-primary transition-colors">
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
                <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Hotel Haven. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;