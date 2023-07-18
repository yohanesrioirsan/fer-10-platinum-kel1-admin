/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../../redux/visualize";

const Chart = React.lazy(() => import("./Chart/Chart"));

export default function DashboardVisualization() {
    // eslint-disable-next-line no-unused-vars
    const [monthSelected, setMonthSelected] = useState( "07" );
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
                `https://bootcamp-rent-cars.herokuapp.com/admin/order/reports?from=2023-${monthSelected}-01&until=2023-${monthSelected}-29`,
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
            { key: "Januari 2023", value: "01" },
            { key: "Februari 2023", value: "02" },
            { key: "Maret 2023", value: "03" },
            { key: "April 2023", value: "04" },
            { key: "Mei 2023", value: "05" },
            { key: "Juni 2023", value: "06" },
            { key: "Juli 2023", value: "07" },
            { key: "Agustus 2023", value: "08" },
            { key: "September 2023", value: "09" },
            { key: "Oktober 2023", value: "10" },
            { key: "November 2023", value: "11" },
            { key: "Desember 2023", value: "12" },
        ]);
    }, [monthSelected]);

    const onChange = (e) => {
        console.log(e.target.value)
        setMonthSelected(e.target.value);
    };

    return (
        <div>
            <div>
                <select value={monthSelected} onChange={onChange}>
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
