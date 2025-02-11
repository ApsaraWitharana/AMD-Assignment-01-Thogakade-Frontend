import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {CustomerModel} from "../model/CustomerModel";

const initialState: CustomerModel[] = [];

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<CustomerModel>) => {
            state.push(action.payload);
        },
        updateCustomer: (state, action: PayloadAction<CustomerModel>) => {
            const index = state.findIndex(customer => customer.CustomerID === action.payload.CustomerID);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        removeCustomer: (state, action: PayloadAction<string>) => {
            return state.filter(customer => customer.Email !== action.payload);
        },
    },
});

export const { addCustomer, updateCustomer, removeCustomer } = customerSlice.actions;
export default customerSlice.reducer;