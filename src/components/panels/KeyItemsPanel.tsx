import {useSelector} from "react-redux";
import {Planets} from "../../types/types";
import {RootState} from "../../game-state/gameState";
import KEY_ITEMS from "../../data/keyItems";

function KeyItemsPanel({planet}: {planet: Planets}) {
    const {keyItemsPanel} = useSelector((state: RootState) => state.unlockedContent);
    const keyItems = useSelector((state: RootState) => state.keyItems);
    const obtainedKeyItems = KEY_ITEMS.filter((_keyItem) => keyItems[_keyItem.id]);

    return (
        <article className={`border rounded-md w-full p-4 transition-all duration-500  ${keyItemsPanel ? "opacity-1" : "opacity-0"}`}>
            <h2 className="text-2xl mb-4">Key Items:</h2>
            <ul>
                {obtainedKeyItems.map((keyItem) => {
                    return <li key={`${keyItem.id}-${keyItem.planet}`}>{keyItem.label} ×1</li>;
                })}
            </ul>
        </article>
    );
}

export default KeyItemsPanel;
