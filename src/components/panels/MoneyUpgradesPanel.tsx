import {SimpleUpgradeProps} from "../../types/types";
import UPGRADES from "../../data/upgrades";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../game-state/gameState";
import {decrementBasicStat} from "../../game-state/slices/basicStatsSlice";
import {enableUpgrade} from "../../game-state/slices/resourceUpgradesSlice";
import checkIfMeetsRequirements from "../../utils/checkIfMeetsRequirements";
import {ABBR_SYMBOLS} from "../../utils/constants";
import {abbreviateNumber} from "js-abbreviation-number";

function MoneyUpgradesPanel() {
    const {money} = useSelector((state: RootState) => state.basicStats);
    const {moneyUpgradesPanel} = useSelector((state: RootState) => state.unlockedContent);
    const upgrades = useSelector((state: RootState) => state.upgrades);
    const dispatch = useDispatch();

    const availableUpgrades = UPGRADES.filter((upgrade) => {
        const hasRequirements = checkIfMeetsRequirements(upgrade.unlockRequirements);
        if (!upgrades[upgrade.id] && hasRequirements) {
            return upgrade;
        }
    }).sort((a, b) => a.price - b.price);

    const buyUpgrade = (upgrade: SimpleUpgradeProps) => {
        if (money < upgrade.price) return;
        dispatch(decrementBasicStat({id: "money", amount: upgrade.price}));
        dispatch(enableUpgrade({id: upgrade.id}));
    };

    return (
        <article className={`border rounded-md w-full row-span-2 p-4 transition-all duration-500 ${moneyUpgradesPanel ? "opacity-1" : "opacity-0"}`}>
            <h2 className="text-2xl mb-4">Upgrades:</h2>
            <ul className="flex gap-2 flex-col overflow-y-auto max-h-[80%] no-scrollbar">
                {availableUpgrades.map((upgrade, index) => {
                    const canBuy = money >= upgrade.price;
                    return (
                        <li className="" key={upgrade.id + index}>
                            <button
                                className={`px-4 py-2 border flex flex-col gap-1 justify-between w-full ${
                                    canBuy ? "border-white hover:border-green-500 cursor-pointer" : "border-red-900"
                                }`}
                                disabled={!canBuy}
                                onClick={() => {
                                    buyUpgrade(upgrade);
                                }}>
                                <div className="flex w-full justify-between">
                                    <span>{upgrade.label}</span>
                                    <span>{abbreviateNumber(upgrade.price, 2, {symbols: ABBR_SYMBOLS})}$</span>
                                </div>
                                <div className="text-sm text-left">{upgrade.description}</div>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}

export default MoneyUpgradesPanel;
