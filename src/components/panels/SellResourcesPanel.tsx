import {useState} from "react";
import {Planets, Resource} from "../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../game-state/gameState";
import {decrementResource} from "../../game-state/slices/resourcesSlice";
import {incrementBasicStat} from "../../game-state/slices/basicStatsSlice";
import {calculateMoneyIncome} from "../../utils/calculateMoneyIncome";
import {ResourceNames} from "../../data/resources";
import MultiList from "../MultiList";

function SellResourcesPanel({planet}: {planet: Planets}) {
    const [multi, setMulti] = useState(1);

    const {sellResourcesPanel} = useSelector((state: RootState) => state.unlockedContent);
    const resources = useSelector((state: RootState) => state.resources).filter((res) => res.planet === planet);
    const dispatch = useDispatch();

    const sellResource = (id: ResourceNames) => {
        const resource = resources.find((_res) => _res.id === id && _res.planet === planet) as Resource;

        const {amountSold, moneyObtained} = calculateMoneyIncome(resource, multi);
        dispatch(incrementBasicStat({id: "money", amount: moneyObtained}));
        dispatch(decrementResource({id: resource.id, amount: amountSold}));
    };

    return (
        <article
            className={`flex flex-col gap-4 border rounded-md w-full h-[20rem] p-4 transition-all duration-500 ${
                sellResourcesPanel ? "opacity-1" : "opacity-0"
            }`}>
            <div className="flex gap-2 w-full items-center">
                <h2 className="text-2xl">Sell:</h2>
                <MultiList callback={(value: number) => setMulti(value)} multi={multi} />
            </div>
            <ul className="grid grid-cols-2 gap-2">
                {resources
                    .filter((resource) => resource.totalFound > 0 && resource.sellValue > 0)
                    .map((resource) => {
                        return (
                            <li key={`${resource.planet}-${resource.id}`}>
                                <button
                                    className="px-2 py-2 border border-white hover:border-green-500 w-full"
                                    onClick={() => sellResource(resource.id)}>
                                    Sell {resource.label} {resource.sellValue}$
                                </button>
                            </li>
                        );
                    })}
            </ul>
        </article>
    );
}

export default SellResourcesPanel;
