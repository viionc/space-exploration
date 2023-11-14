import {createSlice} from "@reduxjs/toolkit";
import ENEMIES, {Enemy, EnemyNames} from "../../data/enemies";

export type BattleState = {
    isBattleActive: boolean;
    battleStatus: BattleStatus;
};

export type BattleStatus = {
    currentEnemyHp: number;
    enemy: Enemy;
};

export type BattleStartAction = {
    payload: EnemyNames;
    type: string;
};
export type ReduceEnemyHpAction = {
    payload: number;
    type: string;
};

const initialState: BattleState = {
    isBattleActive: false,
    battleStatus: {
        currentEnemyHp: 0,
        enemy: {} as Enemy,
    },
};

const battleSlice = createSlice({
    name: "battle",
    initialState,
    reducers: {
        startBattle: (state, action: BattleStartAction) => {
            const {payload} = action;
            const enemy = ENEMIES[payload];
            state.battleStatus.enemy = enemy;
            state.battleStatus.currentEnemyHp = enemy.maxHp;
            state.isBattleActive = true;
        },
        endBattle: (state) => {
            state.isBattleActive = false;
            state.battleStatus.enemy = {} as Enemy;
        },
        reduceEnemyHp: (state, action: ReduceEnemyHpAction) => {
            const {payload} = action;
            state.battleStatus.currentEnemyHp -= payload;
            if (state.battleStatus.currentEnemyHp === 0) {
                battleSlice.caseReducers.endBattle(state);
            }
        },
    },
});

export default battleSlice.reducer;
export const {startBattle, reduceEnemyHp} = battleSlice.actions;
