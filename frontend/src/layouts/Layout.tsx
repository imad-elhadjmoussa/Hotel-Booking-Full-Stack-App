import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Toaster } from "react-hot-toast"

const Layout = () => {
    return (
        <main>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            {/* <BrowserRouter> */}

            <Navbar />

            <div className="">
                <Outlet />
            </div>

            <Footer />

            {/* </BrowserRouter> */}
        </main>
    )
}

export default Layout