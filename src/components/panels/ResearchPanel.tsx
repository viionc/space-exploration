import {Planets, ResearchProps} from "../../types/types";
import RESEARCHES from "../../data/researches";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../game-state/gameState";
import {startResearch} from "../../game-state/slices/researchesSlice";
import {decrementBasicStat} from "../../game-state/slices/basicStatsSlice";

function ResearchPanel({planet}: {planet: Planets}) {
    const {money} = useSelector((state: RootState) => state.basicStats);
    const {researchUnlocked} = useSelector((state: RootState) => state.unlockedContent);
    const researches = useSelector((state: RootState) => state.researches);

    const dispatch = useDispatch();
    const keyItems = useSelector((state: RootState) => state.keyItems).filter((keyItem) => keyItem.planet === planet);

    const availableResearches = RESEARCHES.filter((research) => {
        const hasKeyItem = keyItems.find((keyItem) => keyItem.id === research.unlockRequirement && keyItem.obtained);
        if (research.planet === planet && hasKeyItem) {
            return research;
        }
    });
    const start = (research: ResearchProps) => {
        if (money < research.requiredMoney) return;
        dispatch(startResearch({id: research.id, duration: research.duration}));
        dispatch(decrementBasicStat({id: "money", amount: research.requiredMoney}));
    };
    return (
        <article
            className={`border rounded-md w-full p-4 transition-all duration-500 col-span-3 row-span-2 ${
                researchUnlocked ? "opacity-1" : "opacity-0"
            }`}>
            <h2 className="text-2xl mb-4">Researches: </h2>
            <ul className="grid grid-cols-2 overflow-y-scroll no-scrollbar max-h-[80%]">
                {availableResearches.map((research) => {
                    const canBuy = money > research.requiredMoney;
                    const activeResearch = researches.activeResearches.find((_research) => _research.id === research.id);
                    const backgroundWidth = activeResearch ? `${100 - (activeResearch.duration / research.duration) * 100}%` : "0%";
                    const isActive = activeResearch ? true : false;
                    const isMaxLevel = researches.completedResearches[research.id] === research.maxLevel;
                    return (
                        <li className="relative w-full" key={research.id}>
                            <div className={`absolute top-[1px] left-[1px] bottom-[1px] bg-zinc-900 z-0`} style={{width: backgroundWidth}}></div>
                            <button
                                disabled={!canBuy || isActive || isMaxLevel}
                                onClick={() => start(research)}
                                className={`relative px-4 py-2 border flex w-full h-full z-10 ${
                                    canBuy ? "border-white hover:border-green-500 cursor-pointer" : "border-red-900"
                                }`}>
                                <div className="flex flex-col gap-2 items-start">
                                    <div className={`${isMaxLevel ? "text-green-500" : "text-white"}`}>
                                        {research.label} Lvl {researches.completedResearches[research.id] || 0}/{research.maxLevel}
                                    </div>
                                    <div className="text-left text-sm">{research.effect}</div>
                                    <div className="text-left text-sm">{research.description}</div>
                                </div>
                                <div className="flex flex-col justify-center items-start h-full w-[22rem]">
                                    <div className={`${canBuy ? "text-white" : "text-red-500"}`}>Cost: {research.requiredMoney}$</div>
                                    <div>Duration: {research.duration}</div>
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
