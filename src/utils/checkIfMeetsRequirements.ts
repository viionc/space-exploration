import {BasicStats} from "../game-state/slices/basicStatsSlice";
import {Resource, UnlockRequirement} from "../types/types";
import {gameState} from "../game-state/gameState";
import {Buildings} from "../data/buildings";
import {UpgradesNames} from "../data/upgrades";
import {ResearchNames} from "../data/researches";
import {KeyItemNames} from "../data/keyItems";

const checkIfMeetsRequirements = (unlockRequirements: UnlockRequirement[]) => {
    const {basicStats, resources, keyItems, buildings, researches, upgrades: resourceUpgrades} = gameState.getState();
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
                if (!keyItems[_req.id as KeyItemNames]) {
                    hasRequirements = false;
                }
                break;
            case "building":
                if (!buildings[_req.id as keyof Buildings]) {
                    hasRequirements = false;
                }
                break;
            case "research":
                if (!researches.completedResearches[_req.id as ResearchNames]) {
                    hasRequirements = false;
                }
                break;
            case "resourcesUpgrades":
                if (!resourceUpgrades[_req.id as UpgradesNames]) {
                    hasRequirements = false;
                }
                break;
        }
    }
    return hasRequirements;
};

export default checkIfMeetsRequirements;
