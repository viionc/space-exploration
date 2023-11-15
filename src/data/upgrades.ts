import {SimpleUpgradeProps} from "../types/types";

export type UpgradesNames = `meteoriteUpgrade${number}` | `stoneUpgrade${number}` | "meteoriteDetector" | `stoneQuarry${number}`;
export type UpgradeEffectTypes = "increment" | "multiplier" | "unique" | "baseValue";

const UPGRADES: SimpleUpgradeProps[] = [
    {
        id: "meteoriteUpgrade1",
        planet: "earth",
        resource: "meteorite",
        label: "New Meteorite Detector",
        price: 5500,
        effect: {
            type: "increment",
            value: 1,
        },
        unlockRequirements: [
            {type: "resourcesUpgrades", id: "meteoriteDetector"},
            {type: "basicStats", id: "totalMoney", amount: 5000},
        ],
        description: "Multiplies meteorite click income by 1.",
    },
    {
        id: "meteoriteUpgrade2",
        planet: "earth",
        resource: "meteorite",
        label: "Hire Meteorite Apprentice",
        price: 20000,
        effect: {
            type: "increment",
            value: 2,
        },
        unlockRequirements: [
            {type: "resourcesUpgrades", id: "meteoriteDetector"},
            {type: "basicStats", id: "totalMoney", amount: 5000},
        ],
        description: "Multiplies meteorite click income by 2.",
    },
    {
        id: "meteoriteUpgrade3",
        planet: "earth",
        resource: "meteorite",
        label: "Form Meteorite Team",
        price: 50000,
        effect: {
            type: "increment",
            value: 2,
        },
        unlockRequirements: [
            {type: "resourcesUpgrades", id: "meteoriteDetector"},
            {type: "basicStats", id: "totalMoney", amount: 5000},
        ],
        description: "Multiplies meteorite click income by 2.",
    },
    {
        id: "stoneUpgrade1",
        planet: "earth",
        resource: "stone",
        label: "Shovel",
        price: 50,
        effect: {
            type: "multiplier",
            value: 1.5,
        },
        unlockRequirements: [{type: "basicStats", id: "totalMoney", amount: 10}],
        description: "Multiplies stone click income by 1.5.",
    },
    {
        id: "stoneUpgrade2",
        planet: "earth",
        resource: "stone",
        label: "Pickaxe",
        price: 50,
        effect: {
            type: "multiplier",
            value: 1.5,
        },
        unlockRequirements: [{type: "basicStats", id: "totalMoney", amount: 25}],
        description: "Multiplies stone click income by 1.5.",
    },
    {
        id: "stoneUpgrade3",
        planet: "earth",
        resource: "stone",
        label: "Drill",
        price: 500,
        effect: {
            type: "multiplier",
            value: 1.5,
        },
        unlockRequirements: [{type: "basicStats", id: "totalMoney", amount: 200}],
        description: "Multiplies stone click income by 1.5.",
    },
    {
        id: "meteoriteDetector",
        planet: "earth",
        resource: "meteorite",
        label: "Meteorite Detector",
        price: 5000,
        effect: {
            type: "unique",
        },
        unlockRequirements: [{type: "resource", id: "ironBar", amount: 25}],
        description: "Meteorite Detector allows you to search for meteorite.",
    },
    {
        id: "stoneQuarry1",
        planet: "earth",
        resource: "stone",
        label: "Quarry Output I",
        price: 5000,
        effect: {
            type: "increment",
            value: 1,
        },
        unlockRequirements: [{type: "building", id: "stoneQuarry"}],
        description: "Increases stone quarry output by 1.",
    },
    {
        id: "stoneQuarry2",
        planet: "earth",
        resource: "stone",
        label: "Quarry Output II",
        price: 50000,
        effect: {
            type: "increment",
            value: 1,
        },
        unlockRequirements: [{type: "building", id: "stoneQuarry"}],
        description: "Increases stone quarry output by 1.",
    },
    {
        id: "stoneQuarry3",
        planet: "earth",
        resource: "stone",
        label: "Quarry Output III",
        price: 500000,
        effect: {
            type: "increment",
            value: 1,
        },
        unlockRequirements: [{type: "building", id: "stoneQuarry"}],
        description: "Increases stone quarry output by 1.",
    },
];

export default UPGRADES;
