import {BasicStats} from "../game-state/slices/basicStatsSlice";
import {Buildings, ResearchIds, Resource, UnlockRequirement} from "../types/types";
import {gameState} from "../game-state/gameState";

const checkIfMeetsRequirements = (unlockRequirements: UnlockRequirement[]) => {
    const {basicStats, resources, keyItems, buildings, researches} = gameState.getState();
    let hasRequirements = true;
    for (let i = 0; i < unlockRequirements.length; i++) {
        const _req = unlockRequirements[i];
        if (!hasRequirements) break;

        switch (_req.type) {
            case "basicStats":
                if (basicStats[_req.id as keyof BasicStats] < (_req.amount as number)) {
                    hasRequirements = false;
                }
                break;
            case "resource":
                if ((resources.find((_res) => _res.id === _req.id) as Resource)?.totalFound < (_req.amount as number)) {
                    hasRequirements = false;
                }
                break;
            case "keyItem":
                if (!keyItems.find((_keyItem) => _keyItem.id === _req.id)?.obtained) {
                    hasRequirements = false;
                }
                break;
            case "building":
                if (!buildings[_req.id as keyof Buildings]) {
                    hasRequirements = false;
                }
                break;
            case "research":
                if (!researches.completedResearches[_req.id as keyof ResearchIds]) {
                    hasRequirements = false;
                }
                break;
        }
    }
    return hasRequirements;
};

export default checkIfMeetsRequirements;
