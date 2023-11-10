import {AnyAction, Dispatch} from "redux";
import {updateResearchDuration} from "../game-state/slices/researchesSlice";
import {gameState} from "../game-state/gameState";
import {incrementResource} from "../game-state/slices/resourcesSlice";
const tickHandler = (dispatch: Dispatch<AnyAction>) => {
    const {researches, buildings} = gameState.getState();

    researches.activeResearches.forEach((research) => {
        dispatch(updateResearchDuration({id: research.id, amount: 1}));
    });
    if (buildings.earthMeteoriteMine) {
        dispatch(incrementResource({resource: "meteorite", amount: 1}));
    }
};

export default tickHandler;
