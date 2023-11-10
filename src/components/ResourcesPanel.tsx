import {useSelector} from "react-redux";
import {RootState} from "../game-state/gameState";
import {Planets} from "../types/types";
import {useRef, useState} from "react";

function ResourcesPanel({planet}: {planet: Planets}) {
    // const {contentUnlocks, resources} = useGameStateContext();
    const resources = useSelector((state: RootState) => state.resources).filter((res) => res.planet === planet);
    const {resourcesPanel} = useSelector((state: RootState) => state.unlockedContent);
    const [tooltip, setTooltip] = useState<string | null>(null);
    return (
        <article className={`border rounded-md w-full h-[20rem] p-4 transition-all duration-500 ${resourcesPanel ? "opacity-1" : "opacity-0"}`}>
            <h2 className="text-2xl mb-4">Resources:</h2>
            <ul>
                {resources
                    .filter((resource) => resource.totalFound > 0)
                    .map((resource) => {
                        return (
                            <li
                                className="capitalize relative"
                                onMouseOver={() => {
                                    setTooltip(resource.tooltip);
                                }}
                                onMouseLeave={() => setTooltip(null)}
                                key={`${resource.planet}-${resource.id}`}>
                                <span>
                                    {resource.label} ×{resource.amount}
                                </span>
                                {tooltip ? (
                                    <div className="absolute top-8 left-0 bg-zinc-800 border rounded-md text-sm z-10 p-2">{tooltip}</div>
                                ) : null}
                            </li>
                        );
                    })}
            </ul>
        </article>
    );
}

export default ResourcesPanel;
