import {Planets, SimpleUpgradeProps} from "../types/types";
import RESOURCES_UPGRADES from "../data/resourceUpgrades";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../game-state/gameState";
import {decrementBasicStat} from "../game-state/slices/basicStatsSlice";
import {enableResourceUpgrade} from "../game-state/slices/resourceUpgradesSlice";

function MoneyUpgradesPanel({planet}: {planet: Planets}) {
    // const {money, totalMoney, contentUnlocks, upgrades, buyUpgrade} = useGameStateContext();
    const {money, totalMoney} = useSelector((state: RootState) => state.basicStats);
    const {moneyUpgradesPanel} = useSelector((state: RootState) => state.unlockedContent);
    const upgrades = useSelector((state: RootState) => state.resourceUpgrades);
    const dispatch = useDispatch();

    const availableUpgrades = RESOURCES_UPGRADES.filter((upgrade) => {
        if (planet === upgrade.planet && !upgrades[upgrade.id] && totalMoney >= upgrade.moneyRequiredToUnlock) {
            return upgrade;
        }
    });

    const buyUpgrade = (upgrade: SimpleUpgradeProps) => {
        if (money < upgrade.price) return;
        dispatch(decrementBasicStat({id: "money", amount: upgrade.price}));
        dispatch(enableResourceUpgrade({id: upgrade.id}));
    };

    return (
        <article className={`border rounded-md w-full p-4 transition-all h-[20rem] duration-500 ${moneyUpgradesPanel ? "opacity-1" : "opacity-0"}`}>
            <h2 className="text-2xl mb-4">Upgrades:</h2>
            <ul className="flex gap-2 flex-col overflow-y-auto max-h-[80%] no-scrollbar">
                {availableUpgrades.map((upgrade) => {
                    const canBuy = money >= upgrade.price;
                    return (
                        <li className="" key={upgrade.id}>
                            <button
                                className={`px-4 py-2 border flex justify-between w-full ${
                                    canBuy ? "border-white hover:border-green-500 cursor-pointer" : "border-red-900"
                                }`}
                                disabled={!canBuy}
                                onClick={() => {
                                    buyUpgrade(upgrade);
                                }}>
                                <span>{upgrade.label}</span>
                                <span>{upgrade.price}$</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}

export default MoneyUpgradesPanel;
