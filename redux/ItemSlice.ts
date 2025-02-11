// redux/ItemSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemModel } from '../model/ItemModel';

const initialState: ItemModel[] = [];

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ItemModel>) => {
            state.push(action.payload);
        },
        updateItem: (state, action: PayloadAction<ItemModel>) => {
            const index = state.findIndex(item => item.ItemID === action.payload.ItemID);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            return state.filter(item => item.ItemID !== action.payload);
        },
    },
});

export const { addItem, updateItem, removeItem } = itemSlice.actions;
export default itemSlice.reducer;
