import BuildingsPanel from "./components/panels/BuildingsPanel";
import ForgePanel from "./components/panels/ForgePanel";
import Header from "./components/Header";
import KeyItemsPanel from "./components/panels/KeyItemsPanel";
import MoneyGenerators from "./components/panels/MoneyGeneratorsPanel";
import MoneyUpgradesPanel from "./components/panels/MoneyUpgradesPanel";
import ResearchPanel from "./components/panels/ResearchPanel";
import ResourceGenerators from "./components/panels/ResourceGeneratorsPanel";
import ResourcesPanel from "./components/panels/ResourcesPanel";
import GameStateContextProvider from "./game-state/GameStateContext";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {loadGame} from "./game-state/slices/saveGame";
import Spinner from "./components/Spinner";

function App() {
    const planet = "earth";
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadGame());
        const timeout = setTimeout(() => {
            setLoaded(true);
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    return loaded ? (
        <GameStateContextProvider>
            <Header></Header>
            <main className="grid gap-4 max-w-[1600px] w-[1600px] grid-cols-4  grid-rows-3">
                <ResourceGenerators planet={planet}></ResourceGenerators>
                <MoneyGenerators planet={planet}></MoneyGenerators>
                <ForgePanel planet={planet}></ForgePanel>
                <MoneyUpgradesPanel planet={planet}></MoneyUpgradesPanel>
                <ResourcesPanel planet={planet}></ResourcesPanel>
                <BuildingsPanel planet={planet}></BuildingsPanel>

                <ResearchPanel planet={planet}></ResearchPanel>
                <KeyItemsPanel planet={planet}></KeyItemsPanel>
            </main>
        </GameStateContextProvider>
    ) : (
        <div className="h-[100vh] flex justify-center items-center">
            <Spinner variant={"xl"} />
        </div>
    );
}

export default App;
