import BuildingsPanel from "./components/BuildingsPanel";
import Header from "./components/Header";
import KeyItemsPanel from "./components/KeyItemsPanel";
import MoneyGenerators from "./components/MoneyGeneratorsPanel";
import MoneyUpgradesPanel from "./components/MoneyUpgradesPanel";
import ResearchPanel from "./components/ResearchPanel";
import ResourceGenerators from "./components/ResourceGeneratorsPanel";
import ResourcesPanel from "./components/ResourcesPanel";
import GameStateContextProvider from "./game-state/GameStateContext";

function App() {
    const planet = "earth";
    return (
        <GameStateContextProvider>
            <Header></Header>
            <main className="grid gap-4 w-full container grid-cols-4 grid-rows-4">
                <ResourceGenerators planet={planet}></ResourceGenerators>
                <MoneyGenerators planet={planet}></MoneyGenerators>
                <ResourcesPanel planet={planet}></ResourcesPanel>
                <KeyItemsPanel planet={planet}></KeyItemsPanel>
                <MoneyUpgradesPanel planet={planet}></MoneyUpgradesPanel>
                <BuildingsPanel planet={planet}></BuildingsPanel>
                <ResearchPanel planet={planet}></ResearchPanel>
            </main>
        </GameStateContextProvider>
    );
}

export default App;
