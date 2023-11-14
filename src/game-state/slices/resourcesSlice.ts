import {createAction, createSlice} from "@reduxjs/toolkit";
import {Resource} from "../../types/types";
import RESOURCES, {ResourceNames} from "../../data/resources";

const saveGame = createAction("saveGame");
const loadGame = createAction("loadGame");

const initialState: Resource[] = RESOURCES;

export type ResourcesReducerAction = {
    payload: ResourceActionPayload;
    type: string;
};

export type ResourceActionPayload = {
    id: ResourceNames;
    amount: number;
};

export type ArrayResourcesReducerAction = {
    payload: ResourcesReducerActionPayload[];
    type: string;
};

export type ResourcesReducerActionPayload = {
    id: ResourceNames;
    amount: number;
};
export const incrementResource = createAction<ResourceActionPayload>("incrementResource");

const resourcesSlice = createSlice({
    name: "resources",
    initialState,
    reducers: {
        decrementResource: (state, action: ResourcesReducerAction) => {
            const {payload} = action;
            const resource = state.find((resource) => resource.id === payload.id) as Resource;
            resource.amount -= payload.amount;
        },
        decrementResources: (state, action: ArrayResourcesReducerAction) => {
            const {payload} = action;
            payload.forEach((resourceData) => {
                const resource = state.find((resource) => resource.id === resourceData.id) as Resource;
                resource.amount -= resourceData.amount;
            });
        },
        incrementResources: (state, action: ArrayResourcesReducerAction) => {
            const {payload} = action;
            payload.forEach((resourceData) => {
                const resource = state.find((resource) => resource.id === resourceData.id) as Resource;
                resource.amount += resourceData.amount;
                resource.totalFound += resourceData.amount;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementResource, (state, action: ResourcesReducerAction) => {
                const {payload} = action;
                const resource = state.find((resource) => resource.id === payload.id) as Resource;
                resource.amount += payload.amount;
                resource.totalFound += payload.amount;
            })
            .addCase(loadGame, (state) => {
                const storage = localStorage.getItem("resources");
                if (storage) {
                    state = Object.assign(state, JSON.parse(storage));
                }
                return state;
            })
            .addCase(saveGame, (state) => {
                localStorage.setItem("resources", JSON.stringify(state));
            });
    },
});

export const {decrementResource, incrementResources, decrementResources} = resourcesSlice.actions;
export default resourcesSlice.reducer;
