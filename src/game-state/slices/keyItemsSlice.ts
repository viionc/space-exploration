import {createAction, createSlice} from "@reduxjs/toolkit";
import {KeyItemNames} from "../../data/keyItems";

const saveGame = createAction("saveGame");
const loadGame = createAction("loadGame");

const initialState: Partial<Record<KeyItemNames, boolean>> = {};

export type KeyItemsReducerAction = {
    payload: {
        id: KeyItemNames;
    };
    type: string;
};
const keyItemsSlice = createSlice({
    name: "keyItems",
    initialState,
    reducers: {
        enableKeyItem: (state, action: KeyItemsReducerAction) => {
            const {payload} = action;
            state[payload.id] = true;
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
