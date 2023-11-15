import {Buildings} from "../data/buildings";
import UPGRADES from "../data/upgrades";
import {SimpleUpgradeProps, UpgradesProps} from "../types/types";

const calculateResourceIncome = (upgrades: SimpleUpgradeProps[]): number => {
    let result = 1;
    let increments = 0;
    let multi = 1;
    upgrades.forEach((upgrade) => {
        switch (upgrade.effect.type) {
            case "baseValue":
                result += upgrade.effect.value as number;
                break;
            case "increment":
                increments += upgrade.effect.value as number;
                break;
            case "multiplier":
                multi += upgrade.effect.value as number;
                break;
        }
    });
    result = result * multi + increments;
    return Math.ceil(result);
};

export default calculateResourceIncome;

export const calculateBasedOnBuilding = (building: keyof Buildings, upgrades: Partial<UpgradesProps>): number => {
    const stoneQuarryUpgrades = UPGRADES.filter((_upgrade) => _upgrade.id.startsWith(building) && upgrades[_upgrade.id]);
    const amount = 1 + stoneQuarryUpgrades.length;
    return amount;
};
