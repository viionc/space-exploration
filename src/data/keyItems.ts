import {KeyItem} from "../types/types";
export type KeyItemNames = "suspiciousMeteorite" | "mysteriousRock";
const KEY_ITEMS: KeyItem[] = [
    {
        id: "suspiciousMeteorite",
        label: "Suspicious Meteorite",
        resourceId: "meteorite",
        dropRate: 100,
        planet: "earth",
        description: "",
        obtained: false,
    },
    {
        id: "mysteriousRock",
        label: "Mysterious Rock",
        resourceId: "stone",
        dropRate: 50,
        planet: "earth",
        description: "",
        obtained: false,
    },
];

export default KEY_ITEMS;
