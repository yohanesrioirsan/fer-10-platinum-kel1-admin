import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectTableValue } from "../redux/tableSlice";

export default function DashboardTable() {
    const table = useSelector(selectTableValue)
    console.log(table)
    return (
        <div>
            {table && table.table.orders && table.table.orders.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>User email</th>
                            <th>Start rent</th>
                            <th>Finish rent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.table.orders.map((d) => (
                            <tr key={d.id}>
                                <td>{d.User.email}</td>
                                <td>{d.start_rent_at.split("T")[0]}</td>
                                <td>{d.finish_rent_at.split("T")[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                "null"
            )}
        </div>
    );
}
