import {useSelector} from "react-redux";
import {RootState} from "../../game-state/gameState";

function BattleScreen() {
    const {battleStatus} = useSelector((state: RootState) => state.battle);
    const currentHp = battleStatus.currentEnemyHp;
    const maxHp = battleStatus.enemy.maxHp;
    const imgSrc = battleStatus.enemy.imgSrc;

    return (
        <div className="w-1/2">
            <div id="battle-hp" className="relative bg-black border-zinc-700 rounded-md text-white text-center w-full">
                <div className={`absolute top-0 left-0 bottom-0 w-full bg-red-500 rounded-md`} style={{width: `${(currentHp / maxHp) * 100}%`}}></div>
                <span className="z-10 relative">
                    {currentHp}/{maxHp}
                </span>
            </div>
            <img src={imgSrc} alt="normal asteroid" height={200} width={200}></img>
        </div>
    );
}

export default BattleScreen;
