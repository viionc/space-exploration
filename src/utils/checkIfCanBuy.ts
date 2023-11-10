import {Price, Resource} from "../types/types";
import {gameState} from "../game-state/gameState";
import {BasicStats} from "../game-state/slices/basicStatsSlice";

const checkIfCanBuy = (price: Price[]) => {
    const {resources, basicStats, keyItems} = gameState.getState();
    let hasRequirements = true;
    for (let i = 0; i < price.length; i++) {
        const _req = price[i];
        if (!hasRequirements) break;
        switch (_req.type) {
            case "basicStats":
                if (basicStats[_req.id as keyof BasicStats] < (_req.amount as number)) {
                    hasRequirements = false;
                }
                break;
            case "resource":
                if ((resources.find((_res) => _res.id === _req.id) as Resource)?.amount < (_req.amount as number)) {
                    hasRequirements = false;
                }
                break;
            case "keyItem":
                if (!keyItems.find((_keyItem) => _keyItem.id === _req.id)?.obtained) {
                    hasRequirements = false;
                }
                break;
        }
    }
    return hasRequirements;
};

export default checkIfCanBuy;
