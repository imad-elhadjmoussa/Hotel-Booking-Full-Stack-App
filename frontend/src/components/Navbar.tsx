import { useState } from "react";
import { Button } from "../components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/hotels", label: "Hotels" },
        { path: "/about", label: "About Us" },
        { path: "/contact", label: "Contact" }
    ];

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b">
                <div className="container flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight">Hotel Haven</span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8 relative">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-sm font-medium transition-colors hover:text-primary relative px-2 py-1"
                            >
                                {link.path === location.pathname && (
                                    <motion.span
                                        layoutId="navHighlight"
                                        className="absolute inset-0 bg-primary/10 rounded-md"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                                <span className="relative z-10">
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex">
                        <AuthButtons />
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className="md:hidden absolute left-0 right-0 top-16 bg-white border-b shadow-lg"
                            >
                                <div className="container py-4 flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`text-base font-medium py-2 px-4 rounded-md transition-colors ${link.path === location.pathname
                                                ? "bg-primary/10 text-primary"
                                                : "hover:bg-gray-100"
                                                }`}
                                            onClick={toggleMobileMenu}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    <div className="pt-4 border-t">
                                        <AuthButtons mobile />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Overlay */}
            </nav>
            {mobileMenuOpen && <div className="fixed inset-0 z-10 bg-black/30 md:hidden" onClick={toggleMobileMenu} />}
        </>

    );
};

// const DesktopAuthButtons = () => {
//     const { userId, loading } = useUser();

//     if (loading) {
//         return (
//             <div className="flex items-center gap-2">
//                 <Skeleton className="h-9 w-20 rounded-md" />
//                 <Skeleton className="h-9 w-24 rounded-md" />
//             </div>
//         );
//     }

//     return (
//         <div className="flex items-center gap-2">
//             {userId ? (
//                 <>
//                     <Button size="sm" asChild>
//                         <Link to="/my-bookings">My Bookings</Link>
//                     </Button>
//                     <Button size="sm" asChild>
//                         <Link to="/my-hotels">My Hotels</Link>
//                     </Button>
//                     <Button size="sm">
//                         Logout
//                     </Button>
//                 </>
//             ) : (
//                 <>
//                     <Button size="sm" asChild>
//                         <Link to="/login">Login</Link>
//                     </Button>
//                     <Button variant="outline" size="sm" asChild>
//                         <Link to="/signup">Sign Up</Link>
//                     </Button>
//                 </>
//             )}
//         </div>
//     );
// };
// const MobileAuthButtons = () => {
//     const { userId } = useUser();

//     return (
//         <div className="flex flex-col gap-2">
//             {userId ? (
//                 <>
//                     <Button variant="outline" className="w-full" asChild>
//                         <Link to="/my-bookings">My Bookings</Link>
//                     </Button>
//                     <Button variant="outline" className="w-full" asChild>
//                         <Link to="/my-hotels">My Hotels</Link>
//                     </Button>
//                     <Button className="w-full">
//                         Logout
//                     </Button>
//                 </>
//             ) : (
//                 <>
//                     <Button className="w-full" asChild>
//                         <Link to="/login">Login</Link>
//                     </Button>
//                     <Button variant="outline" className="w-full" asChild>
//                         <Link to="/signup">Sign Up</Link>
//                     </Button>
//                 </>
//             )}
//         </div>
//     );
// }

export default Navbar;