import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../game-state/gameState";
import {cancelBattle} from "../../game-state/slices/battleSlice";
// import {useEffect, useState} from "react";

function BattleScreen() {
    const {battleStatus} = useSelector((state: RootState) => state.battle);
    const {playerAttackPower, playerAttackSpeed} = useSelector((state: RootState) => state.basicStats);
    const dispatch = useDispatch();
    const currentHp = battleStatus.currentEnemyHp;
    const maxHp = battleStatus.enemy.maxHp;
    const imgSrc = battleStatus.enemy.imgSrc;
    const currentTimer = battleStatus.currentAttackTimer;
    // const [timer, setTimer] = useState(0);
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTimer((prev) => prev + 1);
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

    const cancel = () => {
        dispatch(cancelBattle());
    };
    return (
        <div className="w-1/2">
            {/* <span>{timer}</span> */}
            <div id="battle-stats" className="flex gap-2 items-center justify-between">
                <span>Power: {playerAttackPower}</span>
                <span>Speed: {playerAttackSpeed}</span>
            </div>
            <div id="battle-hp" className=" relative bg-black border-zinc-700 rounded-md text-white text-center w-full">
                <div
                    className={`absolute top-0 left-0 bottom-2 w-full bg-red-500 rounded-tl-md rounded-tr-md z-[2]`}
                    style={{width: `${(currentHp / maxHp) * 100}%`}}></div>
                <div
                    className={`absolute top-4 left-0 bottom-0 w-full bg-green-700 rounded-bl-md rounded-br-md `}
                    style={{width: `${(currentTimer / (playerAttackSpeed - 1)) * 100}%`}}></div>
                <span className="z-10 relative">
                    {currentHp}/{maxHp}
                </span>
            </div>
            <img src={imgSrc} alt="normal asteroid" height={200} width={200}></img>
            <button className="px-2 py-2 border hover:border-green-500" onClick={cancel}>
                Leave
            </button>
        </div>
    );
}

export default BattleScreen;
