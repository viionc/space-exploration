import {createAction, createSlice} from "@reduxjs/toolkit";
import {Buildings} from "../../data/buildings";

const saveGame = createAction("saveGame");
const loadGame = createAction("loadGame");

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
    extraReducers: (builder) => {
        builder
            .addCase(loadGame, (state) => {
                const storage = localStorage.getItem("buildings");
                state = storage ? JSON.parse(storage) : initialState;
                return state;
            })
            .addCase(saveGame, (state) => {
                localStorage.setItem("buildings", JSON.stringify(state));
            });
    },
});

export const {enableBuilding} = buildingsSlice.actions;
export default buildingsSlice.reducer;
