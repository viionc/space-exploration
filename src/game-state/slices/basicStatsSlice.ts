import {createAction, createSlice} from "@reduxjs/toolkit";

const saveGame = createAction("saveGame");
const loadGame = createAction("loadGame");
export const updatePlayerBattleStats = createAction<BasicStatsActionPayload>("updatePlayerBattleStats");

export type BasicStats = {
    money: number;
    totalMoney: number;
    totalEarthMeteoriteFound: number;
    playerAttackPower: number;
    playerAttackSpeed: number;
};
export type BasicStatsAction = {
    payload: BasicStatsActionPayload;
    type: string;
};
export type BasicStatsActionPayload = {
    id: keyof BasicStats;
    amount: number;
};
const initialState: BasicStats = {
    money: 0,
    totalMoney: 0,
    totalEarthMeteoriteFound: 0,
    playerAttackPower: 1,
    playerAttackSpeed: 5,
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
                if (storage) {
                    state = Object.assign(state, JSON.parse(storage));
                }
                return state;
            })
            .addCase(saveGame, (state) => {
                localStorage.setItem("basicStats", JSON.stringify(state));
            })
            .addCase(updatePlayerBattleStats, (state, action: BasicStatsAction) => {
                console.log("test");
                const {payload} = action;
                state[payload.id] += payload.amount;
            });
    },
});

export const {incrementBasicStat, decrementBasicStat} = basicStatsSlice.actions;
export default basicStatsSlice.reducer;
