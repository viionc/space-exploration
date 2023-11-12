import {createAction, createSlice} from "@reduxjs/toolkit";
import {ActiveResearch, ResearchIds} from "../../types/types";

const saveGame = createAction("saveGame");
const loadGame = createAction("loadGame");

const initialState: ResearchesState = {
    activeResearches: [],
    completedResearches: {},
};

export type ResearchesState = {
    activeResearches: ActiveResearch[];
    completedResearches: Partial<Record<keyof ResearchIds, number>>;
};

export type CompleteResearchesReducerAction = {
    payload: {
        id: keyof ResearchIds;
    };
    type: string;
};

export type StartResearchReducerAction = {
    payload: ActiveResearch;
    type: string;
};

export type UpdateResearchDurationReducerAction = {
    payload: {
        id: keyof ResearchIds;
        amount: number;
    };
    type: string;
};

const researchesSlice = createSlice({
    name: "researches",
    initialState,
    reducers: {
        startResearch: (state, action: StartResearchReducerAction) => {
            const {payload} = action;
            state.activeResearches.push(payload);
        },
        updateResearchDuration: (state, action: UpdateResearchDurationReducerAction) => {
            const {payload} = action;
            const {id, amount} = payload;
            const research = state.activeResearches.find((_research) => _research.id === id);
            if (!research) return;
            research.duration -= amount;
            if (research.duration <= 0) {
                researchesSlice.caseReducers.completeResearch(state, {type: "", payload: {id}});
            }
        },
        completeResearch: (state, action: CompleteResearchesReducerAction) => {
            const {payload} = action;
            const {id} = payload;
            console.log("test");
            state.completedResearches[id] ? ((state.completedResearches[id] as number) += 1) : (state.completedResearches[id] = 1);
            state.activeResearches = state.activeResearches.filter((research) => research.duration > 0);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadGame, (state) => {
                const storage = localStorage.getItem("researches");
                state = storage ? JSON.parse(storage) : initialState;
                return state;
            })
            .addCase(saveGame, (state) => {
                localStorage.setItem("researches", JSON.stringify(state));
            });
    },
});
export const {startResearch, updateResearchDuration, completeResearch} = researchesSlice.actions;
export default researchesSlice.reducer;
