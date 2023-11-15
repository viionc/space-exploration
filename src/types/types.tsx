import {Buildings} from "../data/buildings";
import {KeyItemNames} from "../data/keyItems";
import {ResearchNames} from "../data/researches";
import {ResourceNames} from "../data/resources";
import {UpgradeEffectTypes, UpgradesNames} from "../data/upgrades";
import {BasicStats} from "../game-state/slices/basicStatsSlice";

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

export type UpgradesProps = Record<UpgradesNames, number>;

// export type ResourceUpgrades = keyof EarthMeteoriteUpgrades | keyof EarthMoneyUpgrades;

export type ContentUnlocksProps = {
    sellResourcesPanel: boolean;
    resourcesPanel: boolean;
    keyItemsPanel: boolean;
    moneyUpgradesPanel: boolean;
    buildingsPanel: boolean;
    researchUnlocked: boolean;
    forge: boolean;
    battlePanel: boolean;
};

export type SimpleUpgradeProps = {
    id: UpgradesNames;
    planet: Planets;
    resource: ResourceNames;
    label: string;
    price: number;
    effect: UpgradeEffect;
    unlockRequirements: UnlockRequirement[];
    description: string;
};

export type UpgradeEffect = {
    type: UpgradeEffectTypes;
    value?: number;
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
    id?: ResourceNames | KeyItemNames | ResearchNames | keyof Buildings | keyof BasicStats | UpgradesNames;
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
    id: ResearchNames;
    planet: Planets;
    label: string;
    description: string;
    duration: number;
    durationIncreasePerLevel: number;
    moneyIncreasePerLevel: number;
    requiredMoney: number;
    unlockRequirements: UnlockRequirement[];
    effect: string;
    resource?: ResourceNames;
    maxLevel?: number;
    increment?: number;
    multiplier?: number;
};

export type ResearchesCompleted = Partial<Record<ResearchNames, boolean>>;

export type ActiveResearch = {
    id: ResearchNames;
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
