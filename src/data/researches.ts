import {ResearchProps} from "../types/types";

const RESEARCHES: ResearchProps[] = [
    {
        id: "refineMeteorite",
        label: "Refine Meteorite",
        planet: "earth",
        description:
            "After extensively researching properties of Suspicious Meteorite, that we found while searching for normal meteorite, we finally came up with ability to refine meteorite and make it more valuable.",
        effect: "Increases value of meteorite you find by 1 per level.",
        duration: 20,
        requiredMoney: 250,
        maxLevel: 9,
        unlockRequirement: "suspiciousMeteorite",
        resource: "meteorite",
    },
];
export default RESEARCHES;
