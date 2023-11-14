import {createAction, createSlice} from "@reduxjs/toolkit";
import {UpgradesProps} from "../../types/types";
import {UpgradesNames} from "../../data/upgrades";

const saveGame = createAction("saveGame");
const loadGame = createAction("loadGame");

const initialState: Partial<UpgradesProps> = {};

export type UpgradesReducerAction = {
    payload: {
        id: UpgradesNames;
    };
    type: string;
};

const upgradesSlice = createSlice({
    name: "upgrades",
    initialState,
    reducers: {
        enableUpgrade: (state, action: UpgradesReducerAction) => {
            state[action.payload.id] = (state[action.payload.id] ?? 0) + 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadGame, (state) => {
                const storage = localStorage.getItem("upgrades");
                if (storage) {
                    state = Object.assign(state, JSON.parse(storage));
                }
                return state;
            })
            .addCase(saveGame, (state) => {
                localStorage.setItem("upgrades", JSON.stringify(state));
            });
    },
});
export const {enableUpgrade} = upgradesSlice.actions;
export default upgradesSlice.reducer;
