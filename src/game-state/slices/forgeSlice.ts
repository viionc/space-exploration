import {createAction, createSlice} from "@reduxjs/toolkit";
import {ResourceNames} from "../../data/resources";
import {ResourcesReducerAction, incrementResource} from "./resourcesSlice";
import {ForgeItem} from "../../data/forge";

const saveGame = createAction("saveGame");
const loadGame = createAction("loadGame");

export type ForgeState = {
    activeForgeItems: ForgeActiveItem[];
};

export interface ForgeActiveItem extends ForgeItem {
    amount: number;
    currentDuration: number;
}
const initialState: ForgeState = {
    activeForgeItems: [],
};

export type ForgeAction = {
    payload: ForgeActiveItem;
    type: string;
};

export type FrogeUpdateAction = {
    payload: {
        id: ResourceNames;
        reducedDuration: number;
    };
    type: string;
};

const forgeSlice = createSlice({
    name: "forge",
    initialState,
    reducers: {
        addItemToForge: (state, action: ForgeAction) => {
            const {payload} = action;
            const item = state.activeForgeItems.find((_item) => _item.id === payload.id);
            if (item) {
                item.amount += payload.amount;
            } else {
                state.activeForgeItems.push(payload);
            }
        },
        updateForgeItem: (state, action: FrogeUpdateAction) => {
            const {payload} = action;
            const item = state.activeForgeItems.find((item) => item.id === payload.id) as ForgeActiveItem;
            item.currentDuration -= payload.reducedDuration;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementResource, (state, action: ResourcesReducerAction) => {
                const item = state.activeForgeItems.find((_item) => _item.output === action.payload.id) as ForgeActiveItem;
                item.amount -= 1;
                item.currentDuration = item.duration;
                state.activeForgeItems = state.activeForgeItems.filter((item) => item.amount > 0);
            })
            .addCase(loadGame, (state) => {
                const storage = localStorage.getItem("forge");

                state = storage ? {...JSON.parse(storage)} : initialState;
                return state;
            })
            .addCase(saveGame, (state) => {
                localStorage.setItem("forge", JSON.stringify(state));
            });
    },
});

export default forgeSlice.reducer;
export const {addItemToForge, updateForgeItem} = forgeSlice.actions;
