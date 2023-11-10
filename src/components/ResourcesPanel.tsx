import {useSelector} from "react-redux";
import {RootState} from "../game-state/gameState";
import {Planets} from "../types/types";

function KeyItemsPanel({planet}: {planet: Planets}) {
    // const {contentUnlocks, resources} = useGameStateContext();
    const resources = useSelector((state: RootState) => state.resources).filter((res) => res.planet === planet);
    const {resourcesPanel} = useSelector((state: RootState) => state.unlockedContent);

    return (
        <article className={`border rounded-md w-full h-[20rem] p-4 transition-all duration-500 ${resourcesPanel ? "opacity-1" : "opacity-0"}`}>
            <h2 className="text-2xl mb-4">Resources:</h2>
            <ul>
                {resources.map((resource) => {
                    return (
                        <li className="capitalize" key={`${resource.planet}-${resource.id}`}>
                            {resource.label} ×{resource.amount}
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}

export default KeyItemsPanel;
