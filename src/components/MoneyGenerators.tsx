import {useState} from "react";
import {Planets, Resource, ResourceIds} from "../types/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../game-state/gameState";
import {decrementResource} from "../game-state/slices/resourcesSlice";
import {incrementBasicStat} from "../game-state/slices/basicStatsSlice";
import {calculateMoneyIncome} from "../utils/calculateMoneyIncome";

const multiValues = ["1", "5", "10", "25", "50", "100", "All"];

function MoneyGenerators({planet}: {planet: Planets}) {
    const [multi, setMulti] = useState("1");

    const {sellResourcesPanel} = useSelector((state: RootState) => state.unlockedContent);
    const resources = useSelector((state: RootState) => state.resources).filter((res) => res.planet === planet);
    const dispatch = useDispatch();

    const sellResource = (id: ResourceIds) => {
        const resource = resources.find((_res) => _res.id === id && _res.planet === planet) as Resource;

        const {amountSold, moneyObtained} = calculateMoneyIncome(resource, multi);
        dispatch(incrementBasicStat({id: "money", amount: moneyObtained}));
        dispatch(decrementResource({resource: resource.id, amount: amountSold}));
    };
    return (
        <article
            className={`flex flex-col gap-4 border rounded-md w-full h-[20rem] p-4 transition-all duration-500 ${
                sellResourcesPanel ? "opacity-1" : "opacity-0"
            }`}>
            <ul className="flex gap-1">
                {multiValues.map((value, index) => {
                    return (
                        <li
                            key={index}
                            className={`h-10 w-10 border flex justify-center items-center cursor-pointer hover:bg-zinc-700 ${
                                multi === value ? "border-zinc-300 bg-zinc-500" : ""
                            }`}
                            onClick={() => setMulti(value)}>
                            x{value}
                        </li>
                    );
                })}
            </ul>
            <ul>
                <li>
                    <button className="px-4 py-2 border border-white hover:border-green-500" onClick={() => sellResource("meteorite")}>
                        Sell Meteorite
                    </button>
                </li>
            </ul>
        </article>
    );
}

export default MoneyGenerators;
