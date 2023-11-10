import {SimpleUpgradeProps} from "../types/types";

const calculateResourceIncome = (upgrades: SimpleUpgradeProps[]): number => {
    let result = 0;
    let multi = 1;
    upgrades.forEach((upgrade) => {
        multi *= upgrade.multiplier;
    });
    result = 1 * multi;
    return Math.floor(result);
};

export default calculateResourceIncome;
