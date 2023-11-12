import {Buildings} from "../data/buildings";
import {ResourceNames} from "../data/resources";
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
    meteorite: Partial<Record<ResourceUpgradesNames, boolean>>;
};

// export type ResourceUpgrades = keyof EarthMeteoriteUpgrades | keyof EarthMoneyUpgrades;

export type ResourceUpgradesNames =
    | "meteoriteUpgrade1"
    | "meteoriteUpgrade2"
    | "meteoriteUpgrade3"
    | "meteoriteUpgrade4"
    | "meteoriteUpgrade5"
    | "meteoriteUpgrade6"
    | "stoneUpgrade1"
    | "stoneUpgrade2"
    | "stoneUpgrade3"
    | "stoneUpgrade4"
    | "stoneUpgrade5"
    | "stoneUpgrade6"
    | "meteoriteDetector";

export type EarthMeteoriteUpgrades = {
    meteoriteUpgrade1: boolean;
    meteoriteUpgrade2: boolean;
    meteoriteUpgrade3: boolean;
    meteoriteUpgrade4: boolean;
    meteoriteUpgrade5: boolean;
    meteoriteUpgrade6: boolean;
};

export type EarthStoneUpgrades = {
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
    researchUnlocked: boolean;
    forge: boolean;
};

export type SimpleUpgradeProps = {
    id: ResourceUpgradesNames;
    planet: Planets;
    resource: ResourceNames;
    label: string;
    price: number;
    multiplier: number;
    unlockRequirements: UnlockRequirement[];
    description: string;
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
    price: Price[];
    label: string;
    unlockRequirements: UnlockRequirement[];
    description: string;
    obtained: boolean;
};

export type Price = {
    type: "basicStats" | "keyItem" | "resource";
    id: ResourceNames | KeyItemNames | keyof BasicStats;
    amount: number;
    label: string;
};

export type UnlockRequirement = {
    type: "basicStats" | "keyItem" | "research" | "building" | "resource" | "resourcesUpgrades";
    id?: ResourceNames | KeyItemNames | keyof ResearchIds | keyof Buildings | keyof BasicStats | ResourceUpgradesNames;
    amount?: number;
};

export type ResourcePrice = Partial<Record<ResourceNames, number>>;

export interface SimpleBuildingPriceProps {
    key: ResourceNames | keyof BasicStats | KeyItemNames;
    type: "money" | "resource" | "keyItem";
    label: string;
    value: number;
}

export type ResearchProps = {
    id: keyof ResearchIds;
    planet: Planets;
    label: string;
    description: string;
    duration: number;
    requiredMoney: number;
    unlockRequirement: KeyItemNames;
    effect: string;
    resource?: ResourceNames;
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
    id: ResourceNames;
    label: string;
    planet: Planets;
    amount: number;
    sellValue: number;
    totalFound: number;
    tooltip: string;
};

export type KeyItem = {
    id: KeyItemNames;
    label: string;
    resourceId?: ResourceNames;
    dropRate: number;
    planet: Planets;
    description: string;
    obtained: boolean;
};
export type KeyItemNames = "suspiciousMeteorite";
