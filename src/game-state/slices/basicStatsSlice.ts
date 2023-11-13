import {createAction, createSlice} from "@reduxjs/toolkit";

const saveGame = createAction("saveGame");
const loadGame = createAction("loadGame");

export type BasicStats = {
    money: number;
    totalMoney: number;
    totalEarthMeteoriteFound: number;
};
export type BasicStatsAction = {
    payload: {
        id: keyof BasicStats;
        amount: number;
    };
    type: string;
};
const initialState: BasicStats = {
    money: 100000,
    totalMoney: 100000,
    totalEarthMeteoriteFound: 0,
};
const basicStatsSlice = createSlice({
    name: "basicStats",
    initialState,
    reducers: {
        incrementBasicStat: (state, action: BasicStatsAction) => {
            const {payload} = action;
            state[payload.id] += payload.amount;
            if (payload.id === "money") state["totalMoney"] += payload.amount;
        },
        decrementBasicStat: (state, action: BasicStatsAction) => {
            const {payload} = action;
            state[payload.id] -= payload.amount;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadGame, (state) => {
                const storage = localStorage.getItem("basicStats");
                state = storage ? JSON.parse(storage) : initialState;
                return state;
            })
            .addCase(saveGame, (state) => {
                localStorage.setItem("basicStats", JSON.stringify(state));
            });
    },
});

export const {incrementBasicStat, decrementBasicStat} = basicStatsSlice.actions;
export default basicStatsSlice.reducer;
