import {BasicStats} from "../game-state/slices/basicStatsSlice";
import {KeyItemNames} from "./keyItems";
import {ResourceNames} from "./resources";

export type Enemy = {
    maxHp: number;
    attackPower: number;
    imgSrc: string;
    loot: EnemyLoot[];
};
export type EnemyLoot = {
    type: "basicStats" | "keyItem" | "resource";
    id: ResourceNames | KeyItemNames | keyof BasicStats;
    baseMinAmount: number;
    baseMaxAmount: number;
};
export type EnemyNames = "asteroidNormal";

const ENEMIES: Record<EnemyNames, Enemy> = {
    "asteroidNormal": {
        maxHp: 10,
        attackPower: 1,
        imgSrc: "/images/asteroidNormal.png",
        loot: [
            {
                type: "resource",
                id: "meteorite",
                baseMinAmount: 1,
                baseMaxAmount: 4,
            },
            {
                type: "resource",
                id: "stone",
                baseMinAmount: 15,
                baseMaxAmount: 100,
            },
            {
                type: "resource",
                id: "iron",
                baseMinAmount: 5,
                baseMaxAmount: 25,
            },
        ],
    },
};

export default ENEMIES;
