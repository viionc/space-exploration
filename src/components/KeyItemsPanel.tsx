import {useSelector} from "react-redux";
import {Planets} from "../types/types";
import {RootState} from "../game-state/gameState";

function KeyItemsPanel({planet}: {planet: Planets}) {
    const {keyItemsPanel} = useSelector((state: RootState) => state.unlockedContent);
    const keyItems = useSelector((state: RootState) => state.keyItems).filter((keyItem) => keyItem.planet === planet && keyItem.obtained);

    return (
        <article className={`border rounded-md w-full p-4 transition-all duration-500 h-[20rem] ${keyItemsPanel ? "opacity-1" : "opacity-0"}`}>
            <h2 className="text-2xl mb-4">Key Items:</h2>
            <ul>
                {keyItems.map((keyItem) => {
                    return <li key={`${keyItem.id}-${keyItem.planet}`}>{keyItem.label} ×1</li>;
                })}
            </ul>
        </article>
    );
}

export default KeyItemsPanel;
