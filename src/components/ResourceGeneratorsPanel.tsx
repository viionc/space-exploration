import {useDispatch, useSelector} from "react-redux";
import {KeyItemNames, Planets, Resource, ResourceNames} from "../types/types";
import {RootState} from "../game-state/gameState";
import {incrementResources} from "../game-state/slices/resourcesSlice";
import RESOURCES_UPGRADES from "../data/resourceUpgrades";
import calculateResourceIncome from "../utils/calculateResourceIncome";
import RESOURCES from "../data/resources";
import {enableContentUnlock} from "../game-state/slices/unlockedContentSlice";
import {enableKeyItem} from "../game-state/slices/keyItemsSlice";
import RESOURCE_RARE_DROPS from "../data/rareDrops";

function ResourceGenerators({planet}: {planet: Planets}) {
    const dispatch = useDispatch();
    const resourceUpgrades = useSelector((state: RootState) => state.resourceUpgrades);
    const resources = useSelector((state: RootState) => state.resources).filter((keyItem) => keyItem.planet === planet);

    const gatherResource = (resource: Resource) => {
        const upgrades = RESOURCES_UPGRADES.filter(
            (_upgrade) => _upgrade.planet === planet && resourceUpgrades[_upgrade.id] && _upgrade.resource === resource.id
        );
        const resourceUpdates = [];
        resourceUpdates.push({id: resource.id, amount: calculateResourceIncome(upgrades)});
        dispatch(enableContentUnlock({id: "resourcesPanel"}));
        const amount = resources.find((res) => res.id === resource.id)?.amount;

        if ((amount || 0) >= 25) {
            dispatch(enableContentUnlock({id: "sellResourcesPanel"}));
        }

        RESOURCE_RARE_DROPS[resource.id].forEach((rareDrop) => {
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
                resourceUpdates.push({id: resId, amount: 1});
            }
        });
        dispatch(incrementResources(resourceUpdates));
    };

    return (
        <article className="border rounded-md w-full p-4 h-[20rem]">
            <ul className="flex flex-col gap-6 ">
                <li>
                    <button
                        id="meteorite-button"
                        className="px-4 py-2 border border-white hover:border-green-500"
                        // onClick={() => dispatchResources({type: "INCREMENT", planet, resource: "meteorite"})}>
                        onClick={() => {
                            gatherResource(RESOURCES.find((resource) => resource.id === "stone") as Resource);
                        }}>
                        Gather stones
                    </button>
                </li>
            </ul>
        </article>
    );
}

export default ResourceGenerators;
