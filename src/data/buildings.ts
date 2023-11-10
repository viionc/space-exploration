import {SimpleBuildingProps} from "../types/types";

const BUILDINGS: SimpleBuildingProps[] = [
    {
        id: "earthResearchFacility",
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
        id: "earthStoneQuarry",
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
        description: "Research Facility will help you discover new technologies and further progress your space exploration adventure.",
        obtained: false,
    },
    {
        id: "earthMeteoriteMine",
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
