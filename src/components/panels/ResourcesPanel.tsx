import {useSelector} from "react-redux";
import {RootState} from "../../game-state/gameState";
import {abbreviateNumber} from "js-abbreviation-number";
import {ABBR_SYMBOLS} from "../../utils/constants";
import {calculateBasedOnBuilding} from "../../utils/calculateResourceIncome";

function ResourcesPanel() {
    // const {contentUnlocks, resources} = useGameStateContext();
    const resources = useSelector((state: RootState) => state.resources).filter((res) => res.totalFound > 0);
    const upgrades = useSelector((state: RootState) => state.upgrades);
    const {resourcesPanel} = useSelector((state: RootState) => state.unlockedContent);
    return (
        <article className={`border rounded-md w-full h-[20rem] p-4 transition-all duration-500 ${resourcesPanel ? "opacity-1" : "opacity-0"}`}>
            <h2 className="text-2xl mb-4">Resources:</h2>
            <ul>
                {resources.map((resource) => {
                    return (
                        <li className="" key={`${resource.planet}-${resource.id}`}>
                            <span className="relative">
                                <div className="flex gap-8 w-full">
                                    <span>
                                        {resource.label}: ×{abbreviateNumber(resource.amount, 2, {symbols: ABBR_SYMBOLS})}{" "}
                                    </span>
                                    <span>{resource.id === "stone" ? `${calculateBasedOnBuilding("stoneQuarry", upgrades)}/s` : ""}</span>
                                </div>
                                {/* {tooltip?.id === resource.id ? (
                                    <span className="absolute top-8 left-0 w-[15rem] bg-zinc-800 border rounded-md text-sm z-10 p-2">
                                        {tooltip.text}
                                    </span>
                                ) : null} */}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}

export default ResourcesPanel;
