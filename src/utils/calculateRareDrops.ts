import {KeyItemsProps, ResourcesProps} from "../types/types";

export const calculateRareResourceDrops = (keyItems: Partial<KeyItemsProps>, resource: keyof ResourcesProps): Array<keyof KeyItemsProps> => {
    const drops = Object.entries(RESOURCE_RARE_DROPS[resource]).filter((entry) => {
        const [key] = entry;
        return !keyItems[key as keyof KeyItemsProps];
    });
    const result: Array<keyof KeyItemsProps> = [];
    drops.forEach((drop) => {
        const [key, value] = drop;
        const roll = Math.ceil(Math.random() * value);

        if (roll === value) {
            result.push(key as keyof KeyItemsProps);
        }
    });
    return result;
};

export const RESOURCE_RARE_DROPS: Record<keyof ResourcesProps, Record<keyof KeyItemsProps, number>> = {
    meteorite: {
        suspiciousMeteorite: 50,
        oldBoot: 1000,
    },
};
