import {ResearchProps} from "../types/types";

export type ResearchNames = "refineMeteorite" | "stoneQuarryEfficiency";

const RESEARCHES: ResearchProps[] = [
    {
        id: "refineMeteorite",
        label: "Refine Meteorite",
        planet: "earth",
        description:
            "After extensively researching properties of Suspicious Meteorite we finally came up with an ability to refine meteorite and make it more valuable.",
        effect: "Increases value of meteorite you find by 1 per level.",
        duration: 120,
        durationIncreasePerLevel: 2,
        moneyIncreasePerLevel: 2,
        requiredMoney: 250,
        maxLevel: 9,
        unlockRequirement: "suspiciousMeteorite",
        resource: "meteorite",
    },
    {
        id: "stoneQuarryEfficiency",
        label: "Stone Quarry Efficiency",
        planet: "earth",
        description: "After making some adjustments Stone Quarry becomes more efficient.",
        effect: "Stone Quarry upgrades also affect stone rare drops.",
        duration: 300,
        durationIncreasePerLevel: 1,
        moneyIncreasePerLevel: 1,
        requiredMoney: 250,
        maxLevel: 1,
        unlockRequirement: "mysteriousRock",
        resource: "stone",
    },
];
export default RESEARCHES;
