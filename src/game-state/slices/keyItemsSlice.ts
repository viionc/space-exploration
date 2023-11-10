import {createSlice} from "@reduxjs/toolkit";
import {KeyItem, KeyItemsProps} from "../../types/types";
import KEY_ITEMS from "../../data/keyItems";

const initialState: KeyItem[] = KEY_ITEMS;
export type KeyItemsReducerAction = {
    payload: {
        id: keyof KeyItemsProps;
    };
    type: string;
};
const keyItemsSlice = createSlice({
    name: "keyItems",
    initialState,
    reducers: {
        enableKeyItem: (state, action: KeyItemsReducerAction) => {
            const {payload} = action;
            const keyItem = state.find((_item) => _item.id === payload.id) as KeyItem;
            keyItem.obtained = true;
        },
    },
});

export const {enableKeyItem} = keyItemsSlice.actions;
export default keyItemsSlice.reducer;
