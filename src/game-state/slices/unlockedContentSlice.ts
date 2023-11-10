import {createSlice} from "@reduxjs/toolkit";
import {ContentUnlocksProps} from "../../types/types";

const initialState: ContentUnlocksProps = {
    sellResourcesPanel: false,
    resourcesPanel: false,
    keyItemsPanel: false,
    moneyUpgradesPanel: false,
    buildingsPanel: false,
    earthResearchUnlocked: false,
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
});
export const {enableContentUnlock} = unlockedContentSlice.actions;
export default unlockedContentSlice.reducer;
