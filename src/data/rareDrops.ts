import {KeyItemNames, ResourceNames} from "../types/types";

export type RareDrop = {
    id: ResourceNames | KeyItemNames;
    dropRate: number;
    keyItem?: boolean;
};

const RESOURCE_RARE_DROPS: Record<ResourceNames, RareDrop[]> = {
    "stone": [
        {
            id: "meteorite",
            dropRate: 50,
            keyItem: false,
        },
    ],
    "meteorite": [],
};

export default RESOURCE_RARE_DROPS;
