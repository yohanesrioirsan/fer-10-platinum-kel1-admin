import { createSlice } from "@reduxjs/toolkit";

const visualizeSlice = createSlice({
    name: "visualize",
    initialState: {
        data: {}
    },
    reducers: {
        setData: (state, action) => {
            state.data =  action.payload
        },

    },
});

export const {
    setData
} = visualizeSlice.actions;

export default visualizeSlice.reducer;
export const selectDataVisualize = (state) => state.visualize;