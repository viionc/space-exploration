import {AnyAction, Dispatch} from "redux";
import {updateResearchDuration} from "../game-state/slices/researchesSlice";
import {gameState} from "../game-state/gameState";
import {ResourcesReducerActionPayload, incrementResource, incrementResources} from "../game-state/slices/resourcesSlice";
import RESOURCE_RARE_DROPS from "../data/rareDrops";
import {enableKeyItem} from "../game-state/slices/keyItemsSlice";
import {ResourceNames} from "../data/resources";
import {updateForgeItem} from "../game-state/slices/forgeSlice";
import FORGE_DATA from "../data/forge";
import {saveGame} from "../game-state/slices/saveGame";
import {KeyItemNames} from "../data/keyItems";
import {calculateBasedOnBuilding} from "../utils/calculateResourceIncome";
import {endBattle, reduceBattleTimer} from "../game-state/slices/battleSlice";
import {BasicStats, incrementBasicStat} from "../game-state/slices/basicStatsSlice";

const SAVE_TIMER = 60; // one minute
let currentSaveTimer = SAVE_TIMER;

const tickHandler = (dispatch: Dispatch<AnyAction>) => {
    const {researches, buildings, forge, upgrades, battle} = gameState.getState();
    const resourceUpdates: ResourcesReducerActionPayload[] = [];
    const rareDrops: ResourcesReducerActionPayload[] = [];

    researches.activeResearches.forEach((research) => {
        dispatch(updateResearchDuration({id: research.id, amount: 1}));
    });
    if (buildings.meteoriteMine) {
        resourceUpdates.push({id: "meteorite" as ResourceNames, amount: 1});
    }
    if (buildings.stoneQuarry) {
        const amount = calculateBasedOnBuilding("stoneQuarry", upgrades);
        resourceUpdates.push({id: "stone" as ResourceNames, amount});
        resourceUpdates.push(...checkForRareDrops(dispatch, "stone", researches.completedResearches.stoneQuarryEfficiency ? amount : 1));
    }
    forge.activeForgeItems.forEach((forgeItem) => {
        if (forgeItem.currentDuration <= 0) {
            dispatch(incrementResource({id: FORGE_DATA[forgeItem.id]?.output as ResourceNames, amount: 1}));
        } else {
            dispatch(updateForgeItem({id: forgeItem.id, reducedDuration: 1}));
        }
    });

    if (battle.isBattleActive) {
        if (battle.battleStatus.currentEnemyHp === 0) {
            battle.battleStatus.enemy.loot.forEach((loot) => {
                if (loot.type === "basicStats") {
                    const lootRoll = Math.ceil(Math.random() * (loot.baseMaxAmount - loot.baseMinAmount) + loot.baseMinAmount);
                    dispatch(incrementBasicStat({id: loot.id as keyof BasicStats, amount: lootRoll}));
                } else if (loot.type === "keyItem") {
                    dispatch(enableKeyItem({id: loot.id as KeyItemNames}));
                } else if (loot.type === "resource") {
                    const lootRoll = Math.ceil(Math.random() * (loot.baseMaxAmount - loot.baseMinAmount) + loot.baseMinAmount);
                    resourceUpdates.push({id: loot.id as ResourceNames, amount: lootRoll});
                }
            });
            dispatch(endBattle());
        }
        dispatch(reduceBattleTimer());
    }

    resourceUpdates.push(...rareDrops);
    dispatch(incrementResources(resourceUpdates));

    currentSaveTimer -= 1;
    if (currentSaveTimer === 0) {
        dispatch(saveGame());
        currentSaveTimer = SAVE_TIMER;
    }
};

const checkForRareDrops = (dispatch: Dispatch<AnyAction>, resourceId: ResourceNames, amount: number): ResourcesReducerActionPayload[] => {
    const result: ResourcesReducerActionPayload[] = [];
    RESOURCE_RARE_DROPS[resourceId].forEach((rareDrop) => {
        const roll = Math.ceil(Math.random() * rareDrop.dropRate);
        if (roll !== rareDrop.dropRate) return;
        if (rareDrop.keyItem) {
            dispatch(enableKeyItem({id: rareDrop.id as KeyItemNames}));
        } else {
            const resId = rareDrop.id as ResourceNames;
            // const rareDropUpgrades = RESOURCES_UPGRADES.filter(
            //     (_upgrade) => _upgrade.planet === planet && resourceUpgrades[_upgrade.id] && _upgrade.resource === resId
            // );
            //calculateResourceIncome(rareDropUpgrades)
            result.push({id: resId, amount});
        }
    });
    return result;
};
export default tickHandler;
