import {createAction, createSlice} from "@reduxjs/toolkit";
import ENEMIES, {Enemy, EnemyNames} from "../../data/enemies";
import {BasicStatsAction, updatePlayerBattleStats} from "./basicStatsSlice";

const saveGame = createAction("saveGame");
const loadGame = createAction("loadGame");

export type BattleState = {
    isBattleActive: boolean;
    battleStatus: BattleStatus;
    battleCooldown: number;
};

export type BattleStatus = {
    currentEnemyHp: number;
    currentAttackTimer: number;
    playerAttackPower: number;
    playerAttackSpeed: number;
    enemy: Enemy;
};

export type BattleStartAction = {
    payload: BattleStartPayload;
    type: string;
};
export type BattleStartPayload = {
    enemyId: EnemyNames;
    playerAttackSpeed: number;
    playerAttackPower: number;
};
export type ReduceEnemyHpAction = {
    payload: number;
    type: string;
};

const initialState: BattleState = {
    isBattleActive: false,
    battleCooldown: 0,
    battleStatus: {
        currentEnemyHp: 0,
        currentAttackTimer: 5,
        playerAttackPower: 1,
        playerAttackSpeed: 5,
        enemy: {} as Enemy,
    },
};

const battleSlice = createSlice({
    name: "battle",
    initialState,
    reducers: {
        startBattle: (state, action: BattleStartAction) => {
            const {payload} = action;
            const enemy = ENEMIES[payload.enemyId];
            state.battleStatus.enemy = enemy;
            state.battleStatus.currentEnemyHp = enemy.maxHp;
            state.battleStatus.playerAttackPower = payload.playerAttackPower;
            state.battleStatus.playerAttackSpeed = payload.playerAttackSpeed;
            state.battleStatus.currentAttackTimer = payload.playerAttackSpeed - 1;
            state.isBattleActive = true;
        },
        endBattle: (state) => {
            state.isBattleActive = false;
            state.battleStatus.enemy = {} as Enemy;
            state.battleCooldown = 30;
        },
        reduceBattleCooldown: (state) => {
            state.battleCooldown -= 1;
        },
        reduceBattleTimer: (state) => {
            if (state.battleStatus.currentAttackTimer === 0) {
                battleSlice.caseReducers.reduceEnemyHp(state);
                state.battleStatus.currentAttackTimer = state.battleStatus.playerAttackSpeed;
            }
            state.battleStatus.currentAttackTimer -= 1;
        },
        reduceEnemyHp: (state) => {
            state.battleStatus.currentEnemyHp -= state.battleStatus.playerAttackPower;
            // if (state.battleStatus.currentEnemyHp === 0) {
            //     battleSlice.caseReducers.endBattle(state);
            // }
        },
        cancelBattle: (state) => {
            state.isBattleActive = false;
            state.battleStatus.enemy = {} as Enemy;
            state.battleCooldown = 30;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(updatePlayerBattleStats, (state, action: BasicStatsAction) => {
                const {payload} = action;
                if (payload.id === "playerAttackPower") {
                    state.battleStatus.playerAttackPower += payload.amount;
                } else if (payload.id === "playerAttackSpeed") {
                    state.battleStatus.playerAttackSpeed -= payload.amount;
                }
            })
            .addCase(loadGame, (state) => {
                const storage = localStorage.getItem("battle");
                if (storage) {
                    state = Object.assign(state, JSON.parse(storage));
                }
                return state;
            })
            .addCase(saveGame, (state) => {
                localStorage.setItem("battle", JSON.stringify(state));
            }),
});

export default battleSlice.reducer;
export const {startBattle, reduceEnemyHp, reduceBattleTimer, endBattle, reduceBattleCooldown, cancelBattle} = battleSlice.actions;
