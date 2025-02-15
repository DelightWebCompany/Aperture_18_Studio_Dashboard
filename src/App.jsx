import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/admin/Navbar";
import Sidebar from "./components/admin/Sidebar";
import { AuthContextProvider } from "./contexts/AuthContext";
import "./App.css";

export default function App() {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
            <AuthContextProvider>
                <Navbar handleOpen={handleOpen} />
                <div className="d-flex bg-theme-light">
                    <Sidebar isOpen={isOpen} />
                    <div className="px-4 py-3 w-100">
                        <Outlet />
                    </div>
                </div>
            </AuthContextProvider>
    );
}
