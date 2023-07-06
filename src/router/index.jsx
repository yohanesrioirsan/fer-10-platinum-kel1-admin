import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import ListCar from "../pages/list-car";
import AddNew from "../pages/addnew";
import EditCar from "../pages/editcar";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cars" element={<Dashboard />} />
          <Route path="/list-car" element={<ListCar />} />
          <Route path="/addnew" element={<AddNew />} />
          <Route path="/editcar/:carId" element={<EditCar />} />
        </Route>
      </Routes>
    </div>
  );
}
