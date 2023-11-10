import {configureStore} from "@reduxjs/toolkit";
import resourcesReducer from "./slices/resourcesSlice";
import resourceUpgradesReducer from "./slices/resourceUpgradesSlice";
import basicStatsReducer from "./slices/basicStatsSlice";
import keyItemsReducer from "./slices/keyItemsSlice";
import unlockedContentReducer from "./slices/unlockedContentSlice";
import buildingsReducer from "./slices/buildingsSlice";
import researchesReducer from "./slices/researchesSlice";

export const gameState = configureStore({
    reducer: {
        resources: resourcesReducer,
        resourceUpgrades: resourceUpgradesReducer,
        basicStats: basicStatsReducer,
        keyItems: keyItemsReducer,
        unlockedContent: unlockedContentReducer,
        buildings: buildingsReducer,
        researches: researchesReducer,
    },
});

export type RootState = ReturnType<typeof gameState.getState>;
export type AppDispatch = typeof gameState.dispatch;
