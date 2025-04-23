// components/layout/MainLayout.jsx

import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import Footer from "../layout/Footer/Footer";

const MainLayout = () => {
    return (
        <>

            <div>
                <NavBar />
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default MainLayout;
