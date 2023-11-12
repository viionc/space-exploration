import {createAction, createSlice} from "@reduxjs/toolkit";
import {ContentUnlocksProps} from "../../types/types";

const saveGame = createAction("saveGame");
const loadGame = createAction("loadGame");

const initialState: ContentUnlocksProps = {
    sellResourcesPanel: false,
    resourcesPanel: false,
    keyItemsPanel: false,
    moneyUpgradesPanel: false,
    buildingsPanel: false,
    researchUnlocked: false,
    forge: false,
};

export type ContentUnlocksReducerAction = {
    payload: {
        id: keyof ContentUnlocksProps;
    };
    type: string;
};

const unlockedContentSlice = createSlice({
    name: "unlockedContent",
    initialState,
    reducers: {
        enableContentUnlock: (state, action: ContentUnlocksReducerAction) => {
            state[action.payload.id] = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadGame, (state) => {
                const storage = localStorage.getItem("unlockedContent");
                state = storage ? JSON.parse(storage) : initialState;
                return state;
            })
            .addCase(saveGame, (state) => {
                localStorage.setItem("unlockedContent", JSON.stringify(state));
            });
    },
});
export const {enableContentUnlock} = unlockedContentSlice.actions;
export default unlockedContentSlice.reducer;
