import {Planets, SimpleBuildingProps} from "../../types/types";
import BUILDINGS from "../../data/buildings";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../game-state/gameState";
import {BasicStats, decrementBasicStat} from "../../game-state/slices/basicStatsSlice";
import {ResourcesReducerActionPayload, decrementResources} from "../../game-state/slices/resourcesSlice";
import {enableBuilding} from "../../game-state/slices/buildingsSlice";
import checkIfMeetsRequirements from "../../utils/checkIfMeetsRequirements";
import checkIfCanBuy from "../../utils/checkIfCanBuy";
import {ResourceNames} from "../../data/resources";
import {abbreviateNumber} from "js-abbreviation-number";
import {ABBR_SYMBOLS} from "../../utils/constants";

function BuildingsPanel({planet}: {planet: Planets}) {
    const buildings = useSelector((state: RootState) => state.buildings);
    const resources = useSelector((state: RootState) => state.resources);
    const basicStats = useSelector((state: RootState) => state.basicStats);
    const {buildingsPanel} = useSelector((state: RootState) => state.unlockedContent);

    const dispatch = useDispatch();

    const availableBuildings = BUILDINGS.filter((building) => {
        const hasRequirements = checkIfMeetsRequirements(building.unlockRequirements);
        if (building.planet === planet && hasRequirements && !buildings[building.id]) {
            return building;
        }
    });

    const buyBuilding = (building: SimpleBuildingProps) => {
        if (!checkIfCanBuy(building.price)) return;
        const resourcesUpdates: ResourcesReducerActionPayload[] = [];
        building.price.forEach((item) => {
            switch (item.type) {
                case "basicStats":
                    dispatch(decrementBasicStat({id: item.id as keyof BasicStats, amount: item.amount}));
                    break;
                case "resource":
                    resourcesUpdates.push({id: item.id as ResourceNames, amount: item.amount});
                    // dispatch(decrementResource({resource: item.id as ResourceNames, amount: item.amount}));
                    break;
            }
        });
        dispatch(decrementResources(resourcesUpdates));
        dispatch(enableBuilding({id: building.id}));
    };
    return (
        <article
            className={`border rounded-md w-full h-[20rem] p-4 transition-all duration-500 col-span-2 ${buildingsPanel ? "opacity-1" : "opacity-0"}`}>
            <h2 className="text-2xl mb-4">Buildings:</h2>
            <ul className="flex flex-col gap-2 overflow-y-scroll no-scrollbar max-h-[80%]">
                {availableBuildings.map((building) => {
                    const canBuy = checkIfCanBuy(building.price);
                    return (
                        <li className="w-full" key={building.id}>
                            <button
                                disabled={!canBuy}
                                onClick={() => (canBuy ? buyBuilding(building) : null)}
                                className={`px-4 py-2 border flex justify-between w-full ${
                                    canBuy ? "border-white hover:border-green-500 cursor-pointer" : "border-red-900"
                                }`}>
                                <div className="flex flex-col items-start w-[70%]">
                                    <div className="text-xl">{building.label}</div>
                                    <div className="text-sm text-left">{building.description}</div>
                                </div>
                                <ul className="flex flex-col gap-2 ms-auto w-[15%]">
                                    {building.price.map((item) => {
                                        return (
                                            <li className="flex gap-2 text-sm" key={item.id}>
                                                <span className="capitalize">{item.label}:</span>
                                                <span>{abbreviateNumber(item.amount, 2, {symbols: ABBR_SYMBOLS})}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}

export default BuildingsPanel;
