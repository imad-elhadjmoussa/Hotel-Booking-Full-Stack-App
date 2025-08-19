import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Layout from "../layouts/Layout";
import AddHotel from "../pages/AddHotel";
import MyHotels from "../pages/MyHotels";
import EditHotel from "../pages/EditHotel";
import SearchHotels from "../pages/SearchHotels";
import { HotelDetails } from "../pages/HotelDetails";
import MyBookings from "../pages/MyBookings";
import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/my-hotels",
                element: <MyHotels />,
            },
            {
                path: "/add-hotel",
                element: <AddHotel />,
            },
            {
                path: "/edit-hotel/:id",
                element: <EditHotel />,
            },
            {
                path: "/search-hotels",
                element: <SearchHotels />,
            },
            {
                path: "/hotel/:id",
                element: <HotelDetails />,
            },
            {
                path: "/my-bookings",
                element: <MyBookings />,
            },
            {
                path: "/contact-us",
                element: <ContactUs />,
            },
            {
                path: "/about-us",
                element: <AboutUs />,
            }
        ],
    },
]);
