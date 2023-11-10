import {createSlice} from "@reduxjs/toolkit";
import {ResourceUpgradesNames} from "../../types/types";

const initialState: Partial<Record<ResourceUpgradesNames, boolean>> = {};

export type ResourceUpgradesReducerAction = {
    payload: {
        id: ResourceUpgradesNames;
    };
    type: string;
};

const resourceUpgradesSlice = createSlice({
    name: "resourceUpgrades",
    initialState,
    reducers: {
        enableResourceUpgrade: (state, action: ResourceUpgradesReducerAction) => {
            state[action.payload.id] = true;
        },
    },
});
export const {enableResourceUpgrade} = resourceUpgradesSlice.actions;
export default resourceUpgradesSlice.reducer;
