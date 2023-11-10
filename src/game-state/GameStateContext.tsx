import {ReactNode, createContext, useContext, useEffect} from "react";
import {GameStateContextProps} from "../types/types";
import tickHandler from "../tickHandler/tickHandler";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./gameState";
import {enableContentUnlock} from "./slices/unlockedContentSlice";

const GameStateContext = createContext<GameStateContextProps | null>(null);

export const useGameStateContext = () => {
    const context = useContext(GameStateContext);
    if (!context) {
        throw new Error("Couldn't initialize Game State.");
    }
    return context;
};

function GameStateContextProvider({children}: {children: ReactNode}) {
    const resources = useSelector((state: RootState) => state.resources);
    const basicStats = useSelector((state: RootState) => state.basicStats);
    const keyItems = useSelector((state: RootState) => state.keyItems);
    const buildings = useSelector((state: RootState) => state.buildings);
    const dispatch = useDispatch();

    useEffect(() => {
        if (basicStats.money >= 25) {
            dispatch(enableContentUnlock({id: "moneyUpgradesPanel"}));
        }
        if (basicStats.totalMoney >= 100 && keyItems.find((item) => item.id === "suspiciousMeteorite")) {
            dispatch(enableContentUnlock({id: "buildingsPanel"}));
        }
        if (buildings.earthResearchFacility) {
            dispatch(enableContentUnlock({id: "earthResearchUnlocked"}));
        }
    }, [basicStats, buildings, keyItems, dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            tickHandler(dispatch);
        }, 1000);
        return () => clearInterval(interval);
    }, [dispatch]);

    return <GameStateContext.Provider value={{}}>{children}</GameStateContext.Provider>;
}

export default GameStateContextProvider;
