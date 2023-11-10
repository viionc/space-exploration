import {SimpleBuildingProps} from "../types/types";

const BUILDINGS: SimpleBuildingProps[] = [
    {
        id: "earthResearchFacility",
        label: "Research Facility",
        planet: "earth",
        requiredMoney: 100,
        requiredResources: {meteorite: 500},
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
        id: "earthMeteoriteMine",
        label: "Meteorite Mine",
        planet: "earth",
        requiredMoney: 500,
        requiredResources: {meteorite: 1000},
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
