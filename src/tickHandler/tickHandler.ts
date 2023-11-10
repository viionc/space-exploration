import {AnyAction, Dispatch} from "redux";
import {updateResearchDuration} from "../game-state/slices/researchesSlice";
import {gameState} from "../game-state/gameState";
import {ResourcesReducerActionPayload, incrementResources} from "../game-state/slices/resourcesSlice";
import {KeyItemNames, ResourceNames} from "../types/types";
import RESOURCE_RARE_DROPS from "../data/rareDrops";
import {enableKeyItem} from "../game-state/slices/keyItemsSlice";

const tickHandler = (dispatch: Dispatch<AnyAction>) => {
    const {researches, buildings} = gameState.getState();

    const resourceUpdates: ResourcesReducerActionPayload[] = [];
    const rareDrops: ResourcesReducerActionPayload[] = [];

    researches.activeResearches.forEach((research) => {
        dispatch(updateResearchDuration({id: research.id, amount: 1}));
    });

    if (buildings.earthMeteoriteMine) {
        resourceUpdates.push({id: "meteorite" as ResourceNames, amount: 1});
    }
    if (buildings.earthStoneQuarry) {
        resourceUpdates.push({id: "stone" as ResourceNames, amount: 1});
    }
    resourceUpdates.forEach((resource) => {
        rareDrops.push(...checkForRareDrops(dispatch, resource.id));
    });
    resourceUpdates.push(...rareDrops);

    dispatch(incrementResources(resourceUpdates));
};

const checkForRareDrops = (dispatch: Dispatch<AnyAction>, resourceId: ResourceNames): ResourcesReducerActionPayload[] => {
    const result: ResourcesReducerActionPayload[] = [];
    RESOURCE_RARE_DROPS[resourceId].forEach((rareDrop) => {
        const roll = Math.ceil(Math.random() * rareDrop.dropRate);
        if (roll !== rareDrop.dropRate) return;
        if (rareDrop.keyItem) {
            dispatch(enableKeyItem({id: rareDrop.id as KeyItemNames}));
        } else {
            const resId = rareDrop.id as ResourceNames;
            // const rareDropUpgrades = RESOURCES_UPGRADES.filter(
            //     (_upgrade) => _upgrade.planet === planet && resourceUpgrades[_upgrade.id] && _upgrade.resource === resId
            // );
            //calculateResourceIncome(rareDropUpgrades)
            result.push({id: resId, amount: 1});
        }
    });
    return result;
};
export default tickHandler;
