import {SimpleUpgradeProps} from "../types/types";

const RESOURCES_UPGRADES: SimpleUpgradeProps[] = [
    {
        id: "meteoriteUpgrade1",
        planet: "earth",
        resource: "meteorite",
        label: "New Meteorite Detector",
        price: 25,
        multiplier: 2,
        moneyRequiredToUnlock: 25,
    },
    {
        id: "meteoriteUpgrade2",
        planet: "earth",
        resource: "meteorite",
        label: "Hire Meteorite Apprentice",
        price: 100,
        multiplier: 2,
        moneyRequiredToUnlock: 25,
    },
    {
        id: "meteoriteUpgrade3",
        planet: "earth",
        resource: "meteorite",
        label: "Form Meteorite Team",
        price: 300,
        multiplier: 2.5,
        moneyRequiredToUnlock: 25,
    },
    {
        id: "meteoriteUpgrade4",
        planet: "earth",
        resource: "meteorite",
        label: "New Meteorite Detector",
        price: 1000,
        multiplier: 2,
        moneyRequiredToUnlock: 150,
    },
    {
        id: "meteoriteUpgrade5",
        planet: "earth",
        resource: "meteorite",
        label: "New Meteorite Detector",
        price: 2000,
        multiplier: 3,
        moneyRequiredToUnlock: 500,
    },
    {
        id: "meteoriteUpgrade6",
        planet: "earth",
        resource: "meteorite",
        label: "New Meteorite Detector",
        price: 5000,
        multiplier: 2,
        moneyRequiredToUnlock: 3000,
    },
];

export default RESOURCES_UPGRADES;
