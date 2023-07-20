import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
    name: "table",
    initialState: {
        table: {},
        page: 1,
        pageSize: 10

    },
    reducers: {
        setTable: (state, action) => {
            state.table = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload
        }

    },
});

export const {
    setTable,setPage,setPageSize
} = tableSlice.actions;

export default tableSlice.reducer;
export const selectTableValue = (state) => state.table;
export const selectTablePageValue = (state) => state.table.page;
export const selectTablePageSizeValue= (state) => state.table.pageSize;