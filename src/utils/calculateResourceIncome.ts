import {Buildings} from "../data/buildings";
import UPGRADES from "../data/upgrades";
import {SimpleUpgradeProps, UpgradesProps} from "../types/types";

const calculateResourceIncome = (upgrades: SimpleUpgradeProps[]): number => {
    let result = 0;
    let multi = 1;
    upgrades.forEach((upgrade) => {
        multi *= upgrade.multiplier;
    });
    result = 1 * multi;
    return Math.ceil(result);
};

export default calculateResourceIncome;

export const calculateBasedOnBuilding = (building: keyof Buildings, upgrades: Partial<UpgradesProps>): number => {
    const stoneQuarryUpgrades = UPGRADES.filter((_upgrade) => _upgrade.id.startsWith(building) && upgrades[_upgrade.id]);
    const amount = stoneQuarryUpgrades.length;
    return amount;
};
