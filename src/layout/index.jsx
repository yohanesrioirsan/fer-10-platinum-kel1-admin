import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";

export default function Layout() {
  return (
    <div className="d-flex vh-100 w-100 z-3">
      <div className="vh-100 position-fixed" style={{ zIndex: "2" }}>
        <Sidebar />
      </div>
      <div className="w-100" style={{ marginLeft: "120px" }}>
        <Header />
        <div style={{ marginTop: "10px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
