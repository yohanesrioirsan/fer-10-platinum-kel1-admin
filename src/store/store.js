import { configureStore } from "@reduxjs/toolkit";
// import { authApiSlice } from "../slice/auth/AuthApiSlice";
// import { apiSlice } from "../redux/authSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "../redux/authSlice";
import loadingSlice from "../redux/loadingSlice";
import messageSlice from "../redux/messageSlice";
import tableSlice from "../redux/tableSlice";
import visualize from "../redux/visualize";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        // [apiSlice.reducerPath]: apiSlice.reducer,
        auth: persistedReducer,
        loading : loadingSlice,
        message: messageSlice,
        table: tableSlice,
        visualize,        

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
    devTools: true,
});

export const persistor = persistStore(store);
