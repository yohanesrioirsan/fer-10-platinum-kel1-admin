/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../../redux/visualize";

const Chart = React.lazy(() => import("./Chart/Chart"));

export default function DashboardVisualization() {
    // eslint-disable-next-line no-unused-vars
    const [monthSelected, setMonthSelected] = useState( "2023-07" );
    const [listMonth, setListMonth] = useState([]);
    const dispatch = useDispatch();
    // func
    const getDataOrder = async () => {
        const config = {
            headers: {
                access_token: localStorage.getItem("token"),
            },
        };
        await axios
            .get(
                `https://api-car-rental.binaracademy.org/admin/order/reports?from=${monthSelected}-01&until=${monthSelected}-29`,
                config
            )
            .then((payload) => {
                console.log(payload.data);
                dispatch(setData(payload.data));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getDataOrder();
        setListMonth([
            { key: "Januari 2022", value: "2022-01" },
            { key: "Februari 2022", value: "2022-02" },
            { key: "Maret 2022", value: "2022-03" },
            { key: "April 2022", value: "2022-04" },
            { key: "Mei 2022", value: "2022-05" },
            { key: "Juni 2022", value: "2022-06" },
            { key: "Juli 2022", value: "2022-07" },
            { key: "Agustus 2022", value: "2022-08" },
            { key: "September 2022", value: "2022-09" },
            { key: "Oktober 2022", value: "2022-10" },
            { key: "November 2022", value: "2022-11" },
            { key: "Desember 2022", value: "2022-12" },
            { key: "Januari 2023", value: "2023-01" },
            { key: "Februari 2023", value: "2023-02" },
            { key: "Maret 2023", value: "2023-03" },
            { key: "April 2023", value: "2023-04" },
            { key: "Mei 2023", value: "2023-05" },
            { key: "Juni 2023", value: "2023-06" },
            { key: "Juli 2023", value: "2023-07" },
            { key: "Agustus 2023", value: "2023-08" },
            { key: "September 2023", value: "2023-09" },
            { key: "Oktober 2023", value: "2023-10" },
            { key: "November 2023", value: "2023-11" },
            { key: "Desember 2023", value: "2023-12" },
        ]);
    }, [monthSelected]);

    const onChange = (e) => {
        console.log(e.target.value)
        setMonthSelected(e.target.value);
    };

    return (
        <div>
            <div className="pt-4">Month</div>
            <div className="py-4">
                <select value={monthSelected} onChange={onChange} className="p-2 rounded">
                    {listMonth.map((d) => (
                        <option value={d.value}>{d.key}</option>
                    ))}
                </select>
            </div>
            <React.Suspense fallback={<div>Loading..</div>}>
                <Chart />
            </React.Suspense>
        </div>
    );
}
