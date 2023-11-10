import {Buildings, Planets, ResearchIds, Resource, ResourceIds, SimpleBuildingPriceProps, SimpleBuildingProps} from "../types/types";
import BUILDINGS from "../data/buildings";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../game-state/gameState";
import {BasicStats, decrementBasicStat} from "../game-state/slices/basicStatsSlice";
import {decrementResource} from "../game-state/slices/resourcesSlice";
import {enableBuilding} from "../game-state/slices/buildingsSlice";

const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`);

const createPriceArray = (building: SimpleBuildingProps): Array<SimpleBuildingPriceProps> => {
    const result: SimpleBuildingPriceProps[] = [];
    if (building.requiredMoney) result.push({type: "money", key: "money", label: "Money", value: building.requiredMoney});
    if (building.requiredKeyItem)
        result.push({type: "keyItem", key: building.requiredKeyItem, label: camelToSnakeCase(building.requiredKeyItem), value: 1});
    if (building.requiredResources) {
        const req = Object.entries(building.requiredResources);
        req.forEach((r) => {
            const [key, value] = r;
            result.push({type: "resource", key: key as ResourceIds, label: camelToSnakeCase(key), value});
        });
    }
    return result;
};

function BuildingsPanel({planet}: {planet: Planets}) {
    // const {contentUnlocks, keyItems, resources, money, buildings, buyBuilding} = useGameStateContext();

    const basicStats = useSelector((state: RootState) => state.basicStats);
    const keyItems = useSelector((state: RootState) => state.keyItems).filter((keyItem) => keyItem.planet === planet);
    const resources = useSelector((state: RootState) => state.resources).filter((resource) => resource.planet === planet);
    const buildings = useSelector((state: RootState) => state.buildings);
    const researches = useSelector((state: RootState) => state.researches);
    const {buildingsPanel} = useSelector((state: RootState) => state.unlockedContent);

    const dispatch = useDispatch();

    const availableBuildings = BUILDINGS.filter((building) => {
        let hasRequirements = true;
        for (let i = 0; i < building.unlockRequirements.length; i++) {
            const _req = building.unlockRequirements[i];
            switch (_req.type) {
                case "basicStats":
                    if (basicStats[_req.id as keyof BasicStats] < (_req.amount as number)) {
                        hasRequirements = false;
                    }
                    break;
                case "resource":
                    if ((resources.find((_res) => _res.id === _req.id) as Resource)?.totalFound < (_req.amount as number)) {
                        hasRequirements = false;
                    }
                    break;
                case "keyItem":
                    if (!keyItems.find((_keyItem) => _keyItem.id === _req.id)) {
                        hasRequirements = false;
                    }
                    break;
                case "building":
                    if (!buildings[_req.id as keyof Buildings]) {
                        hasRequirements = false;
                    }
                    break;
                case "research":
                    if (!researches.completedResearches[_req.id as keyof ResearchIds]) {
                        hasRequirements = false;
                    }
                    break;
            }
        }
        if (building.planet === planet && hasRequirements && !buildings[building.id]) {
            return building;
        }
    });

    const checkIfCanBuy = (building: SimpleBuildingProps) => {
        if (building.requiredMoney) {
            if (basicStats.money < building.requiredMoney) return false;
        }
        if (building.requiredKeyItem) {
            const keyItem = keyItems.find((key) => key.id === building.requiredKeyItem);
            if (!keyItem?.obtained) return false;
        }
        if (building.requiredResources) {
            const req = Object.entries(building.requiredResources);
            for (let i = 0; i < req.length; i++) {
                const [key, value] = req[i];
                const resource = resources.find((res) => res.id === key);
                if ((resource?.amount ?? 0) < value) {
                    return false;
                }
            }
        }
        return true;
    };

    const buyBuilding = (building: SimpleBuildingProps, price: SimpleBuildingPriceProps[]) => {
        if (!checkIfCanBuy(building)) return;

        price.forEach((item) => {
            switch (item.type) {
                case "money":
                    dispatch(decrementBasicStat({id: "money", amount: item.value}));
                    break;
                case "resource":
                    dispatch(decrementResource({resource: item.key as ResourceIds, amount: item.value}));
                    break;
            }
        });
        dispatch(enableBuilding({id: building.id}));
    };
    return (
        <article
            className={`border rounded-md w-full h-[20rem] p-4 transition-all duration-500 col-span-2 ${buildingsPanel ? "opacity-1" : "opacity-0"}`}>
            <h2 className="text-2xl mb-4">Buildings:</h2>
            <ul className="flex flex-col gap-2 overflow-y-scroll no-scrollbar max-h-[80%]">
                {availableBuildings.map((building) => {
                    const canBuy = checkIfCanBuy(building);
                    const price = createPriceArray(building);
                    return (
                        <li key={building.id}>
                            <button
                                disabled={!canBuy}
                                onClick={() => (canBuy ? buyBuilding(building, price) : null)}
                                className={`px-4 py-2 border flex justify-between w-full ${
                                    canBuy ? "border-white hover:border-green-500 cursor-pointer" : "border-red-900"
                                }`}>
                                <div className="flex flex-col items-start max-w-[70%]">
                                    <div className="text-xl">{building.label}</div>
                                    <div className="text-sm text-left">{building.description}</div>
                                </div>
                                <ul className="flex flex-col gap-2 w-[15%]">
                                    {price.map((item) => {
                                        return (
                                            <li className="flex gap-2 text-sm" key={item.key}>
                                                <span className="capitalize">{item.label}:</span>
                                                <span>{item.value}</span>
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
