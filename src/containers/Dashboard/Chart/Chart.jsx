import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";
import { selectDataVisualize } from "../../../redux/visualize";

ChartJS.register(CategoryScale, LinearScale, BarElement);
export default function Chart() {
    const dataOrder = useSelector(selectDataVisualize);
    // const { dataOrd/er } = useSelector((state) => state.dataOrder);
    const [dataChart, setDataChart] = useState({});

    // # function sort and count duplicate

    useEffect(() => {
        console.log(Object.values(dataOrder.data).length)
        if (Object.values(dataOrder.data).length !== 0) {
            console.log(Object.values(dataOrder.data))
            const chartData = {
                labels: Object.values(dataOrder.data).map((item,index) => index+1 ), // Assuming 'day' holds the label value
                datasets: [
                    {
                        label: "Order Count",
                        data: dataOrder.data.map((item) => item.orderCount),
                        borderWidth: 1,
                    },
                ],
            };
            setDataChart(chartData);
        }
    }, [dataOrder]);

    useEffect(() => {
        console.log(dataChart);
    }, [dataChart]);

    return (
        <div>
            {Object.values(dataChart).length === 0 ? (
                <div>You dont have data</div>
            ) : (
                <div>
                    <Bar data={dataChart} />
                    <p>Total Order</p>
                    <p>Date</p>
                </div>
            )}
        </div>
    );
}
