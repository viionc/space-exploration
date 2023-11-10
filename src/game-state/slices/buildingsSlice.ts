import {createSlice} from "@reduxjs/toolkit";
import {Buildings} from "../../types/types";

const initialState: Partial<Buildings> = {};

export type BuildingsReducerAction = {
    payload: {
        id: keyof Buildings;
    };
    type: string;
};

const buildingsSlice = createSlice({
    name: "buildings",
    initialState,
    reducers: {
        enableBuilding: (state, action: BuildingsReducerAction) => {
            const {payload} = action;
            state[payload.id] = true;
        },
    },
});

export const {enableBuilding} = buildingsSlice.actions;
export default buildingsSlice.reducer;
