import {createSlice} from "@reduxjs/toolkit";
import {Resource, ResourceIds} from "../../types/types";
import RESOURCES from "../../data/resources";

const initialState: Resource[] = RESOURCES;

export type ResourcesReducerAction = {
    payload: {
        resource: ResourceIds;
        amount: number;
    };
    type: string;
};

const resourcesSlice = createSlice({
    name: "resources",
    initialState,
    reducers: {
        incrementResource: (state, action: ResourcesReducerAction) => {
            const {payload} = action;
            const resource = state.find((resource) => resource.id === payload.resource) as Resource;
            resource.amount += payload.amount;
            resource.totalFound += payload.amount;
        },
        decrementResource: (state, action: ResourcesReducerAction) => {
            const {payload} = action;
            const resource = state.find((resource) => resource.id === payload.resource) as Resource;
            resource.amount -= payload.amount;
        },
    },
});

export const {incrementResource, decrementResource} = resourcesSlice.actions;
export default resourcesSlice.reducer;
