import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        userData: {}
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.access_token;
        },
        setUserData: (state, action) => {
            state.userData = {...action.payload};
        },

        setLogout: (state) => {
            state.token = null;
            state.userData = {};
        },
    },
});

export const {
    setToken,
    setUserData,
    setLogout,
} = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUserdata = (state) => state.auth.userData;