import {createSlice} from "@reduxjs/toolkit";
import {Resource, ResourceNames} from "../../types/types";
import RESOURCES from "../../data/resources";

const initialState: Resource[] = RESOURCES;

export type ResourcesReducerAction = {
    payload: {
        id: ResourceNames;
        amount: number;
    };
    type: string;
};

export type ArrayResourcesReducerAction = {
    payload: ResourcesReducerActionPayload[];
    type: string;
};

export type ResourcesReducerActionPayload = {
    id: ResourceNames;
    amount: number;
};

const resourcesSlice = createSlice({
    name: "resources",
    initialState,
    reducers: {
        incrementResource: (state, action: ResourcesReducerAction) => {
            const {payload} = action;
            const resource = state.find((resource) => resource.id === payload.id) as Resource;
            resource.amount += payload.amount;
            resource.totalFound += payload.amount;
        },
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
});

export const {incrementResource, decrementResource, incrementResources, decrementResources} = resourcesSlice.actions;
export default resourcesSlice.reducer;
