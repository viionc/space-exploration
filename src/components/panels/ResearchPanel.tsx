import {ResearchProps} from "../../types/types";
import RESEARCHES from "../../data/researches";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../game-state/gameState";
import {startResearch} from "../../game-state/slices/researchesSlice";
import {decrementBasicStat} from "../../game-state/slices/basicStatsSlice";
import format from "format-duration";
import Spinner from "../Spinner";
import {useState} from "react";
import checkIfMeetsRequirements from "../../utils/checkIfMeetsRequirements";

function ResearchPanel() {
    const {money} = useSelector((state: RootState) => state.basicStats);
    const {researchUnlocked} = useSelector((state: RootState) => state.unlockedContent);
    const researches = useSelector((state: RootState) => state.researches);
    const [hideCompleted, setHideCompleted] = useState<boolean>(false);

    const dispatch = useDispatch();

    const availableResearches = RESEARCHES.filter((research) => {
        const hasRequirements = checkIfMeetsRequirements(research.unlockRequirements);
        if (hasRequirements) {
            return research;
        }
    }).sort((a, b) => {
        const a_isMaxLevel = researches.completedResearches[a.id] === a.maxLevel;
        const b_isMaxLevel = researches.completedResearches[b.id] === b.maxLevel;
        if (a_isMaxLevel) return 1;
        if (b_isMaxLevel) return -1;
        return 0;
    });
    const start = (research: ResearchProps, price: number, duration: number) => {
        if (money < price) return;
        dispatch(startResearch({id: research.id, duration: duration}));
        dispatch(decrementBasicStat({id: "money", amount: price}));
    };
    return (
        <article
            className={`border rounded-md w-full p-4 transition-all duration-500 col-span-3 row-span-2 ${
                researchUnlocked ? "opacity-1" : "opacity-0"
            }`}>
            <div className="flex justify-between items-start">
                <h2 className="text-2xl mb-4">Researches: </h2>
                <button
                    className="border border-white px-2 py-2 hover:border-green-500 cursor-pointer"
                    onClick={() => setHideCompleted((prev) => !prev)}>
                    {hideCompleted ? "Show" : "Hide"} Completed
                </button>
            </div>
            <ul className="grid grid-cols-2 gap-2 overflow-y-scroll no-scrollbar max-h-[80%]">
                {availableResearches.map((research) => {
                    const researchesCompleted = (researches.completedResearches[research.id] ?? 0) + 1;
                    const price = research.requiredMoney * researchesCompleted * research.moneyIncreasePerLevel;
                    const duration = research.duration * (researchesCompleted * research.durationIncreasePerLevel);
                    const canBuy = money > price;
                    const activeResearch = researches.activeResearches.find((_research) => _research.id === research.id);
                    const backgroundWidth = activeResearch ? `${100 - (activeResearch.duration / duration) * 100}%` : "0%";
                    const isActive = activeResearch ? true : false;
                    const isMaxLevel = researches.completedResearches[research.id] === research.maxLevel;
                    if (isMaxLevel && hideCompleted) return <></>;
                    return (
                        <li className="relative w-full" key={research.id}>
                            <div className={`absolute top-[1px] left-[1px] bottom-[1px] bg-zinc-900 z-0`} style={{width: backgroundWidth}}></div>
                            <button
                                disabled={!canBuy || isActive || isMaxLevel}
                                onClick={() => start(research, price, duration)}
                                className={`relative px-4 py-2 border flex w-full h-full z-10 ${
                                    canBuy ? "border-white" : isMaxLevel ? "border-white" : "border-red-500"
                                }
                                    ${!isMaxLevel ? "hover:border-green-500 cursor-pointer" : ""}
                                    `}>
                                <div className="flex flex-col gap-2 items-start w-full">
                                    <div className="w-full flex justify-between">
                                        <div className={`${isMaxLevel ? "text-green-500" : "text-white"}`}>
                                            {research.label} Lvl {researches.completedResearches[research.id] || 0}/{research.maxLevel}
                                        </div>
                                        {!isMaxLevel && !activeResearch ? (
                                            <div className="flex gap-4 items-center">
                                                <div className={`${canBuy ? "text-white" : "text-red-500"}`}>{price}$</div>
                                                <div>{format(duration * 1000)}</div>
                                            </div>
                                        ) : null}
                                        {activeResearch ? (
                                            <div className="flex gap-1 items-center ">
                                                <Spinner variant="sm"></Spinner>
                                                <span>{format(activeResearch.duration * 1000)}</span>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="text-left text-sm">{research.description}</div>
                                    <div className="text-left text-sm">{research.effect}</div>
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}

export default ResearchPanel;
