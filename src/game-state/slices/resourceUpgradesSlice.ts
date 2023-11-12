import {createAction, createSlice} from "@reduxjs/toolkit";
import {ResourceUpgradesNames} from "../../types/types";

const saveGame = createAction("saveGame");
const loadGame = createAction("loadGame");

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
    extraReducers: (builder) => {
        builder
            .addCase(loadGame, (state) => {
                const storage = localStorage.getItem("resourceUpgrades");
                state = storage ? JSON.parse(storage) : initialState;
                return state;
            })
            .addCase(saveGame, (state) => {
                localStorage.setItem("resourceUpgrades", JSON.stringify(state));
            });
    },
});
export const {enableResourceUpgrade} = resourceUpgradesSlice.actions;
export default resourceUpgradesSlice.reducer;
