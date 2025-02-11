import {configureStore} from "@reduxjs/toolkit";
import itemSlice from "../redux/ItemSlice";
import customerSlice from "../redux/customerSlice";

export const store = configureStore({

    reducer: {
        customer:customerSlice,
        items:itemSlice

    }
})
export type AppDispatch = typeof store.dispatch;