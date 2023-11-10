import {createSlice} from "@reduxjs/toolkit";
import {ResourceUpgrades} from "../../types/types";

const initialState: Partial<Record<ResourceUpgrades, boolean>> = {};

export type ResourceUpgradesReducerAction = {
    payload: {
        id: ResourceUpgrades;
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
