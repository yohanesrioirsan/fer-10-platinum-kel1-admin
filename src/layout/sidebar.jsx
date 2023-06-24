import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./index.css"; // Import the custom CSS file
import { FiTruck } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";

export default function Sidebar() {
    const location = useLocation();
    const sidebarStyle = {
        width: "120px",
    };

    const logo = {
        width: "40px",
        height: "40px",
    };

    const activeSidebar = {
        backgroundColor: "#5568c1",
        color: "#ffffff",
    };
    const defaultSidebar = {
        color: "#ffffff",
    };
    const isActive = (path) => location.pathname === path;

    return (
        <aside className="bg-primary " style={sidebarStyle}>
            <div className="sidebar-logo df-center">
                <span />
            </div>
            <div className="cursor-pointer sidebar d-flex flex-column align-items-center py-2 w-100">
                <div className="bg-danger mb-4" style={logo} />
                <NavLink to="/dashboard" style={isActive("/dashboard") ? activeSidebar : defaultSidebar} className="pb-2 w-100">
                    <div className="d-flex flex-column align-items-center py-2">
                        <AiOutlineHome />
                        <div className=" ">Dashboard</div>
                    </div>
                </NavLink>
                <NavLink to="/cars" style={isActive("/cars") ? activeSidebar : defaultSidebar} className="pb-2 w-100">
                    <div className="d-flex flex-column align-items-center py-2">
                        <FiTruck />
                        <div className=" ">Cars</div>
                    </div>
                </NavLink>
            </div>
        </aside>
    );
}
