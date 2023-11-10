import {Resource} from "../types/types";
import {gameState} from "../game-state/gameState";
import RESEARCHES from "../data/researches";

const calculateNewValue = (oldValue: number, multi: string) => {
    return multi === "All" || parseInt(multi) > oldValue ? oldValue : parseInt(multi);
};

// const calculateNewMoneyAmount = (resource: Resource, amountSold: number) => {
//     // add resource values
//     return resource.sellValue * amountSold;
// };

export const calculateMoneyIncome = (resource: Resource, multi: string) => {
    const {researches} = gameState.getState();
    const researchesForThisResource = RESEARCHES.filter((_res) => {
        if (_res.resource === resource.id && researches.completedResearches[_res.id]) {
            return _res;
        }
    });

    const amountSold = calculateNewValue(resource.amount, multi);

    let resourceValue = resource.sellValue;
    researchesForThisResource.forEach((_res) => (resourceValue += researches.completedResearches[_res.id] || 0));
    const moneyObtained = resourceValue * amountSold;

    return {amountSold, moneyObtained};
};
