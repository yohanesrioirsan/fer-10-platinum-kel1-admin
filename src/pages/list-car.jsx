import { useState } from "react";

export default function ListCar() {
    const [data, setData] = useState({
        name: "Saya",
        bank: "BCA",
        time: "2022-10-05",
    });
    return (
        <>
            <div> {data.name} </div>
            <div> {data.time} </div>
            <div>list-car</div>
        </>
    );
}
