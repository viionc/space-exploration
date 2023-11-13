import {KeyItemNames} from "./keyItems";
import {ResourceNames} from "./resources";

export type RareDrop = {
    id: ResourceNames | KeyItemNames;
    dropRate: number;
    keyItem?: boolean;
};

const RESOURCE_RARE_DROPS: Record<ResourceNames, RareDrop[]> = {
    "stone": [
        {
            id: "iron",
            dropRate: 50,
            keyItem: false,
        },
        {
            id: "coal",
            dropRate: 25,
            keyItem: false,
        },
        {
            id: "mysteriousRock",
            dropRate: 50,
            keyItem: true,
        },
    ],
    "meteorite": [
        {
            id: "suspiciousMeteorite",
            dropRate: 50,
            keyItem: true,
        },
    ],
    "coal": [],
    "iron": [],
    "ironBar": [],
};

export default RESOURCE_RARE_DROPS;
