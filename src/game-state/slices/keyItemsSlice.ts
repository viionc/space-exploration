import {createAction, createSlice} from "@reduxjs/toolkit";
import {KeyItem, KeyItemsProps} from "../../types/types";
import KEY_ITEMS from "../../data/keyItems";

const saveGame = createAction("saveGame");
const loadGame = createAction("loadGame");

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
    extraReducers: (builder) => {
        builder
            .addCase(loadGame, (state) => {
                const storage = localStorage.getItem("keyItems");
                state = storage ? JSON.parse(storage) : initialState;
                return state;
            })
            .addCase(saveGame, (state) => {
                localStorage.setItem("keyItems", JSON.stringify(state));
            });
    },
});

export const {enableKeyItem} = keyItemsSlice.actions;
export default keyItemsSlice.reducer;
