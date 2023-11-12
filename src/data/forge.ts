import {ResourceNames} from "./resources";

export type FuelNames = "coal" | "oil";
export type Fuel = {
    id: ResourceNames;
    amount: number;
};

export type ForgeItem = {
    id: ResourceNames;
    duration: number;
    output: ResourceNames;
    label: string;
    fuel: Fuel;
};
export type ForgeData = Partial<Record<ResourceNames, ForgeItem>>;

const FORGE_DATA: ForgeData = {
    "iron": {
        id: "iron",
        duration: 5,
        output: "ironBar",
        label: "Iron Bar",
        fuel: {
            id: "coal",
            amount: 1,
        },
    },
};

export default FORGE_DATA;
