import {useSelector} from "react-redux";
import {RootState} from "../game-state/gameState";
import {ABBR_SYMBOLS} from "../utils/constants";
import {abbreviateNumber} from "js-abbreviation-number";

function Header() {
    const {money} = useSelector((state: RootState) => state.basicStats);
    return (
        <header className="h-[5rem] container py-2">
            <ul className="flex text-2xl items-center h-full gap-4">
                <li>Money: {abbreviateNumber(money, 2, {symbols: ABBR_SYMBOLS})}$</li>
            </ul>
        </header>
    );
}

export default Header;
