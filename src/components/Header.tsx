import {useSelector} from "react-redux";
import {RootState} from "../game-state/gameState";

function Header() {
    const {money} = useSelector((state: RootState) => state.basicStats);
    return (
        <header className="h-[5rem] container py-2">
            <ul className="flex text-2xl items-center h-full gap-4">
                <li>Money: {money}$</li>
            </ul>
        </header>
    );
}

export default Header;
