import {SimpleBuildingProps} from "../types/types";

export type Buildings = {
    researchFacility: boolean;
    meteoriteMine: boolean;
    stoneQuarry: boolean;
    forge: boolean;
};

const BUILDINGS: SimpleBuildingProps[] = [
    {
        id: "researchFacility",
        label: "Research Facility",
        planet: "earth",
        price: [
            {type: "basicStats", id: "money", label: "Money", amount: 100},
            {type: "resource", id: "stone", label: "Stone", amount: 500},
        ],
        unlockRequirements: [
            {
                type: "keyItem",
                id: "suspiciousMeteorite",
            },
        ],
        description: "Research Facility will help you discover new technologies and further progress your space exploration adventure.",
        obtained: false,
    },
    {
        id: "stoneQuarry",
        label: "Stone Quarry",
        planet: "earth",
        price: [
            {type: "basicStats", id: "money", label: "Money", amount: 100},
            {type: "resource", id: "stone", label: "Stone", amount: 500},
        ],
        unlockRequirements: [
            {
                type: "resource",
                id: "stone",
                amount: 250,
            },
        ],
        description: "Stone Quarry will automatically gather stone.",
        obtained: false,
    },
    {
        id: "forge",
        label: "Forge",
        planet: "earth",
        price: [
            {type: "basicStats", id: "money", label: "Money", amount: 100},
            {type: "resource", id: "stone", label: "Stone", amount: 500},
            {type: "resource", id: "iron", label: "Iron", amount: 100},
        ],
        unlockRequirements: [
            {
                type: "resource",
                id: "iron",
                amount: 25,
            },
        ],
        description: "Forge is used to smelt ores.",
        obtained: false,
    },
    {
        id: "meteoriteMine",
        label: "Meteorite Mine",
        planet: "earth",
        price: [
            {type: "basicStats", id: "money", label: "Money", amount: 500},
            {type: "resource", id: "stone", label: "Stone", amount: 1000},
        ],
        unlockRequirements: [
            {
                type: "basicStats",
                id: "totalMoney",
                amount: 250,
            },
            {type: "resource", id: "meteorite", amount: 250},
        ],
        description: "Simple mine that will automaticaly find meteorite.",
        obtained: false,
    },
];

export default BUILDINGS;
