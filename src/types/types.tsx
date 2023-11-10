import {BasicStats} from "../game-state/slices/basicStatsSlice";

export type GameStateContextProps = {};

export type Planets = "earth";
export type GameResourcesProps = Record<Planets, Partial<ResourcesProps>>;
export type GameKeyItemsProps = Record<Planets, Partial<KeyItemsProps>>;
export type GameUpgradesProps = Record<Planets, Partial<UpgradesProps>>;
export type GameBuildingsProps = Record<Planets, Partial<Buildings>>;

export type KeyItemsProps = {
    suspiciousMeteorite: boolean;
    oldBoot: boolean;
};
export type ResourcesProps = {
    meteorite: number;
};

export type UpgradesProps = {
    meteorite: Partial<Record<ResourceUpgrades, boolean>>;
};

export type ResourceUpgrades = keyof EarthMeteoriteUpgrades | keyof EarthMoneyUpgrades;

export type EarthMeteoriteUpgrades = {
    meteoriteUpgrade1: boolean;
    meteoriteUpgrade2: boolean;
    meteoriteUpgrade3: boolean;
    meteoriteUpgrade4: boolean;
    meteoriteUpgrade5: boolean;
    meteoriteUpgrade6: boolean;
};

export type EarthMoneyUpgrades = {
    moneyUpgrade1: boolean;
    moneyUpgrade2: boolean;
    moneyUpgrade3: boolean;
    moneyUpgrade4: boolean;
    moneyUpgrade5: boolean;
    moneyUpgrade6: boolean;
};

export type ContentUnlocksProps = {
    sellResourcesPanel: boolean;
    resourcesPanel: boolean;
    keyItemsPanel: boolean;
    moneyUpgradesPanel: boolean;
    buildingsPanel: boolean;
    earthResearchUnlocked: boolean;
};

export type SimpleUpgradeProps = {
    id: ResourceUpgrades;
    planet: Planets;
    resource: keyof ResourcesProps;
    label: string;
    price: number;
    multiplier: number;
    moneyRequiredToUnlock: number;
};

export type ResourceReducerAction = {
    type: "INCREMENT" | "DECREMENT" | "SELL_RESOURCE";
    planet: Planets;
    resource: keyof ResourcesProps;
    multi?: string;
};
export type SimpleBuildingProps = {
    id: keyof Buildings;
    planet: Planets;
    requiredMoney?: number;
    requiredKeyItem?: KeyItemNames;
    requiredResources?: ResourcePrice;
    label: string;
    unlockRequirements: BuildingRequirement[];
    description: string;
    obtained: boolean;
};

export type BuildingRequirement = {
    type: "basicStats" | "keyItem" | "research" | "building" | "resource";
    id?: ResourceIds | KeyItemNames | keyof ResearchIds | keyof Buildings | keyof BasicStats;
    amount?: number;
};

export type ResourcePrice = Partial<Record<ResourceIds, number>>;

export interface SimpleBuildingPriceProps {
    key: ResourceIds | keyof BasicStats | KeyItemNames;
    type: "money" | "resource" | "keyItem";
    label: string;
    value: number;
}

export type Buildings = {
    earthResearchFacility: boolean;
    earthMeteoriteMine: boolean;
};
export type ResearchProps = {
    id: keyof ResearchIds;
    planet: Planets;
    label: string;
    description: string;
    duration: number;
    requiredMoney: number;
    unlockRequirement: KeyItemNames;
    effect: string;
    resource?: ResourceIds;
    maxLevel?: number;
};

export type ResearchIds = {
    refineMeteorite: boolean;
};

export type ActiveResearch = {
    id: keyof ResearchIds;
    duration: number;
};

export type Resource = {
    id: ResourceIds;
    label: string;
    planet: Planets;
    amount: number;
    sellValue: number;
    totalFound: number;
};

export type ResourceIds = "meteorite";
export type KeyItem = {
    id: KeyItemNames;
    label: string;
    resourceId?: ResourceIds;
    dropRate: number;
    planet: Planets;
    description: string;
    obtained: boolean;
};
export type KeyItemNames = "suspiciousMeteorite";
