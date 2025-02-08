import customerReducer from "../reducers/CustomerReducer";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({

    reducer: {
        customer:customerReducer,


    }
})
export type AppDispatch = typeof store.dispatch;