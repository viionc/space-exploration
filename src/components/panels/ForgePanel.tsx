import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../game-state/gameState";
import FORGE_DATA, {ForgeItem} from "../../data/forge";
import {ResourceNames} from "../../data/resources";
import {addItemToForge} from "../../game-state/slices/forgeSlice";
import {decrementResources} from "../../game-state/slices/resourcesSlice";
import MultiList from "../MultiList";
import Spinner from "../Spinner";
import {toast} from "react-toastify";

function ForgePanel() {
    const [multi, setMulti] = useState(1);

    const {forge: forgeUnlock} = useSelector((state: RootState) => state.unlockedContent);
    const forge = useSelector((state: RootState) => state.forge);
    const resources = useSelector((state: RootState) => state.resources);
    const dispatch = useDispatch();
    const forgeItems = Object.entries(FORGE_DATA) as [ResourceNames, ForgeItem][];

    const startSmelitng = (item: ForgeItem) => {
        const fuelOwned = resources.find((_item) => _item.id === item.fuel.id);
        const itemOwned = resources.find((_item) => _item.id === item.id);
        if (fuelOwned && itemOwned && fuelOwned.amount >= item.fuel.amount * multi && itemOwned.amount >= multi) {
            dispatch(addItemToForge({...item, amount: multi, currentDuration: item.duration}));
            dispatch(
                decrementResources([
                    {id: item.fuel.id, amount: item.fuel.amount * multi},
                    {id: item.id, amount: multi},
                ])
            );
        } else {
            toast.error("Not enough fuel or resource.");
        }
    };

    return (
        <article
            className={`flex flex-col gap-4 border rounded-md w-full h-[20rem] p-4 transition-all duration-500 ${
                forgeUnlock ? "opacity-1" : "opacity-0"
            }`}>
            <div className="flex gap-2 w-full items-center">
                <h2 className="text-2xl">Forge:</h2>
                <MultiList callback={(value: number) => setMulti(value)} multi={multi} />
            </div>
            <ul className="grid grid-cols-2 gap-2">
                {forgeItems.map(([, item]) => {
                    const forgeItem = forge.activeForgeItems.find((_item) => _item.id === item.id);
                    const backgroundWidth = forgeItem ? `${100 - (forgeItem.currentDuration / forgeItem.duration) * 100}%` : "0%";
                    return (
                        <li className="relative" key={item.id}>
                            <div className={`absolute top-[1px] left-[1px] bottom-[1px] bg-zinc-900 z-0`} style={{width: backgroundWidth}}></div>
                            <button
                                onClick={() => startSmelitng(item)}
                                className="relative z-10 px-4 py-2 border border-white hover:border-green-500 w-full flex justify-between"
                                key={`${item.id}`}>
                                <span>{item.label}</span>
                                {forgeItem && (
                                    <span className="flex gap-1 items-center">
                                        <Spinner variant="sm" />
                                        {forgeItem.amount}
                                    </span>
                                )}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}

export default ForgePanel;
