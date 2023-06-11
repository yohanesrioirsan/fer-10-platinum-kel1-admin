import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        loading: false
    },
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true;
        },
        setLoadingFalse: (state) => {
            state.loading = false;

        },

    },
});

export const {
    setLoadingTrue,
    setLoadingFalse,
} = loadingSlice.actions;

export default loadingSlice.reducer;
export const selectLoading = (state) => state.loading.loading;