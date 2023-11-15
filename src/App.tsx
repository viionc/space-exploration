import BuildingsPanel from "./components/panels/BuildingsPanel";
import ForgePanel from "./components/panels/ForgePanel";
import Header from "./components/Header";
import KeyItemsPanel from "./components/panels/KeyItemsPanel";
import SellResourcesPanel from "./components/panels/SellResourcesPanel";
import MoneyUpgradesPanel from "./components/panels/MoneyUpgradesPanel";
import ResearchPanel from "./components/panels/ResearchPanel";
import ResourceGenerators from "./components/panels/ResourceGeneratorsPanel";
import ResourcesPanel from "./components/panels/ResourcesPanel";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadGame} from "./game-state/slices/saveGame";
import Spinner from "./components/Spinner";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tickHandler from "./tickHandler/tickHandler";
import {RootState} from "./game-state/gameState";
import {enableContentUnlock} from "./game-state/slices/unlockedContentSlice";
import {setInterval, clearInterval} from "worker-timers";
import {GAME_VERSION} from "./utils/constants";
import BattlePanel from "./components/panels/BattlePanel";

function App() {
    const [loaded, setLoaded] = useState(false);
    const resources = useSelector((state: RootState) => state.resources);
    const basicStats = useSelector((state: RootState) => state.basicStats);
    const keyItems = useSelector((state: RootState) => state.keyItems);
    const buildings = useSelector((state: RootState) => state.buildings);
    const unlockedContent = useSelector((state: RootState) => state.unlockedContent);
    const dispatch = useDispatch();

    // load data
    useEffect(() => {
        dispatch(loadGame());
        const timeout = setTimeout(() => {
            setLoaded(true);
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    // rework unlock system later
    useEffect(() => {
        if (basicStats.money >= 25 && !unlockedContent.moneyUpgradesPanel) {
            dispatch(enableContentUnlock({id: "moneyUpgradesPanel"}));
        }
        if ((resources.find((_res) => _res.id === "stone")?.totalFound || 0) >= 250 && !unlockedContent.buildingsPanel) {
            dispatch(enableContentUnlock({id: "buildingsPanel"}));
        }
        if (buildings.researchFacility && !unlockedContent.researchUnlocked) {
            dispatch(enableContentUnlock({id: "researchUnlocked"}));
        }
        if (buildings.forge && !unlockedContent.forge) {
            dispatch(enableContentUnlock({id: "forge"}));
        }
        if (keyItems["mysteriousRock"] && !unlockedContent.keyItemsPanel) {
            dispatch(enableContentUnlock({id: "keyItemsPanel"}));
        }
    }, [basicStats, buildings, resources, dispatch, keyItems, unlockedContent]);

    // used web workers so interval keeps running when browser tab is inactive
    useEffect(() => {
        const interval = setInterval(() => {
            tickHandler(dispatch);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return loaded ? (
        <>
            <ToastContainer theme="dark" closeOnClick pauseOnHover />
            <div className="absolute top-1 left-1 text-sm">{GAME_VERSION}</div>
            <Header></Header>
            <main className="grid gap-4 max-w-[1600px] w-[1600px] grid-cols-4  grid-rows-4">
                <ResourceGenerators></ResourceGenerators>
                <SellResourcesPanel></SellResourcesPanel>
                <ForgePanel></ForgePanel>
                <MoneyUpgradesPanel></MoneyUpgradesPanel>

                <ResourcesPanel></ResourcesPanel>
                <BuildingsPanel></BuildingsPanel>

                <KeyItemsPanel></KeyItemsPanel>
                <ResearchPanel></ResearchPanel>
                <BattlePanel></BattlePanel>
            </main>
        </>
    ) : (
        <div className="h-[100vh] flex justify-center items-center">
            <Spinner variant={"xl"} />
        </div>
    );
}

export default App;
