import React from "react";
import { FormControl } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useDispatch, useSelector } from "react-redux";
import { selectTableValue, setPage, setPageSize } from "../../redux/tableSlice";

export default function DashboardPagination() {
    const table = useSelector(selectTableValue)
    const dispatch = useDispatch();

    const onLimitChange = (e) => {
        dispatch(setPageSize(e.target.value))
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex flex-grow-1">
                    <div className="me-3">
                        <span className="d-block">Limit</span>
                        <FormControl as="select"  onChange={onLimitChange}>
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </FormControl>
                    </div>
                    {table && table.table.pageCount && table.table.pageCount > 0 ? (
                        <div>
                            <span className="d-block">Jump to page</span>
                            <FormControl as="select" onChange={(e) => dispatch(setPage(e.target.value))}>
                                {Array.from(
                                    { length: Math.ceil(table.table.pageCount / table.table.pageSize) },

                                    (_, index) => (
                                        <option value={index + 1} key={index}>
                                            {index + 1}
                                        </option>
                                    )
                                )}
                            </FormControl>
                        </div>
                    ) : null}
                </div>
                <div>
                    <span className="d-block">&nbsp;</span>
                    <PaginationControl
                        page={1}
                        between={4}
                        total={table && table.table.pageCount ? table.table.pageCount : 0}
                        limit={table && table.table.pageSize ? table.table.pageSize : 0}
                        changePage={(p) => {
                            dispatch(setPage(p));
                        }}
                        ellipsis={1}
                    />
                </div>
            </div>
        </div>
    );
}
