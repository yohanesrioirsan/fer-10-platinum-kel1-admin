/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DashboardTable from "./DashboardTable";
import DashboardPagination from "./DashboardPagination";
import { selectTablePageSizeValue, selectTablePageValue, selectTableValue, setTable } from "../../redux/tableSlice";
import DashboardVisualization from "./DashboardVisualization";

export default function DashboardContainer() {
    const pageSize = useSelector(selectTablePageSizeValue);
    const page = useSelector(selectTablePageValue);

    const dispatch = useDispatch();
    const fetchAPIOrder = async () => {
        try {
            const response = await axios.get("https://bootcamp-rent-cars.herokuapp.com/admin/v2/order", {
                params: {
                    page,
                    pageSize,
                },
                headers: {
                    access_token:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY4ODM5Mjc2MH0.5Swm1H97WL0nEm1Gu5T5rJqUe_Jx9XP4IGQNikdDJ5k",
                },
            });

            console.log(response);
            if (response.status === 200) {
                console.log(response.data);
                dispatch(setTable(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAPIOrder();
    }, [page, pageSize]);

    return (
        <div className="px-5">
            <div className="gap-3 d-flex justify-content-start align-items-center">
                <div style={{ width: "5px", height: "20px", backgroundColor: "#0d28a6" }} />
                <div>Rented Car Data Visualization</div>
            </div>
            <DashboardVisualization />
            <h4>Dashboard</h4>
            <div className="gap-3 d-flex justify-content-start align-items-center">
                <div style={{ width: "5px", height: "20px", backgroundColor: "#0d28a6" }} />
                <div>List Order</div>
            </div>
            <DashboardTable />
            <DashboardPagination />
        </div>
    );
}
