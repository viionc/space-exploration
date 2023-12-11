import {useSelector} from "react-redux";
import {RootState} from "../game-state/gameState";
import {ABBR_SYMBOLS} from "../utils/constants";
import {abbreviateNumber} from "js-abbreviation-number";
import {Tabs} from "../types/types";

interface HeaderProps {
    activeTab: Tabs;
    callback: React.Dispatch<React.SetStateAction<Tabs>>;
}

function Header({activeTab, callback}: HeaderProps) {
    const {money} = useSelector((state: RootState) => state.basicStats);
    const {researchUnlocked} = useSelector((state: RootState) => state.unlockedContent);
    return (
        <header className="h-[5rem] container py-2 w-full">
            <ul className="flex text-2xl items-center h-full gap-4 w-full">
                <li>Money: {abbreviateNumber(money, 2, {symbols: ABBR_SYMBOLS})}$</li>
                <div className="ms-auto">
                    <ul className="flex gap-2">
                        <li
                            onClick={() => callback("main")}
                            className={`underline cursor-pointer hover:text-white ${activeTab === "main" ? "text-white" : "text-zinc-400"}`}>
                            Main
                        </li>
                        {researchUnlocked ? (
                            <li
                                onClick={() => callback("researches")}
                                className={`underline cursor-pointer hover:text-white ${
                                    activeTab === "researches" ? "text-white" : "text-zinc-400"
                                }`}>
                                Researches
                            </li>
                        ) : null}
                    </ul>
                </div>
            </ul>
        </header>
    );
}

export default Header;
