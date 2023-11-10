import {createSlice} from "@reduxjs/toolkit";

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
    money: 0,
    totalMoney: 0,
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
});

export const {incrementBasicStat, decrementBasicStat} = basicStatsSlice.actions;
export default basicStatsSlice.reducer;
