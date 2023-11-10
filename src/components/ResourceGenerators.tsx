import {useDispatch, useSelector} from "react-redux";
import {Planets, Resource} from "../types/types";
import {RootState} from "../game-state/gameState";
import {incrementResource} from "../game-state/slices/resourcesSlice";
import RESOURCES_UPGRADES from "../data/resourceUpgrades";
import calculateResourceIncome from "../utils/calculateResourceIncome";
import RESOURCES from "../data/resources";
import {enableContentUnlock} from "../game-state/slices/unlockedContentSlice";
import {enableKeyItem} from "../game-state/slices/keyItemsSlice";

function ResourceGenerators({planet}: {planet: Planets}) {
    const dispatch = useDispatch();
    const resourceUpgrades = useSelector((state: RootState) => state.resourceUpgrades);
    const keyItems = useSelector((state: RootState) => state.keyItems).filter((keyItem) => keyItem.planet === planet);
    const resources = useSelector((state: RootState) => state.resources).filter((keyItem) => keyItem.planet === planet);

    const gatherResource = (resource: Resource) => {
        const upgrades = RESOURCES_UPGRADES.filter(
            (_upgrade) => _upgrade.planet === planet && resourceUpgrades[_upgrade.id] && _upgrade.resource === resource.id
        );

        dispatch(incrementResource({resource: resource.id, amount: calculateResourceIncome(upgrades)}));
        dispatch(enableContentUnlock({id: "resourcesPanel"}));
        const amount = resources.find((res) => res.id === resource.id)?.amount;

        if ((amount || 0) >= 25) {
            dispatch(enableContentUnlock({id: "sellResourcesPanel"}));
        }

        keyItems
            .filter((keyItem) => keyItem.resourceId === resource.id)
            .forEach((keyItem) => {
                const roll = Math.ceil(Math.random() * keyItem.dropRate);
                if (roll === keyItem.dropRate) {
                    dispatch(enableKeyItem({id: keyItem.id}));
                    if (keyItem.id === "suspiciousMeteorite") {
                        dispatch(enableContentUnlock({id: "keyItemsPanel"}));
                    }
                }
            });
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
                            gatherResource(RESOURCES.find((resource) => resource.id === "meteorite") as Resource);
                        }}>
                        Look for meteorite
                    </button>
                </li>
            </ul>
        </article>
    );
}

export default ResourceGenerators;
