import {configureStore} from "@reduxjs/toolkit";
import resourcesReducer from "./slices/resourcesSlice";
import upgradesReducer from "./slices/resourceUpgradesSlice";
import keyItemsReducer from "./slices/keyItemsSlice";
import unlockedContentReducer from "./slices/unlockedContentSlice";
import buildingsReducer from "./slices/buildingsSlice";
import researchesReducer from "./slices/researchesSlice";
import forgeReducer from "./slices/forgeSlice";
import basicStatsReducer from "./slices/basicStatsSlice";

export const gameState = configureStore({
    reducer: {
        resources: resourcesReducer,
        upgrades: upgradesReducer,
        basicStats: basicStatsReducer,
        keyItems: keyItemsReducer,
        unlockedContent: unlockedContentReducer,
        buildings: buildingsReducer,
        researches: researchesReducer,
        forge: forgeReducer,
    },
});

export type RootState = ReturnType<typeof gameState.getState>;
export type AppDispatch = typeof gameState.dispatch;
