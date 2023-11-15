import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../game-state/gameState";
import BattleScreen from "./BattleScreen";
import ENEMIES, {EnemyNames} from "../../data/enemies";
import {startBattle} from "../../game-state/slices/battleSlice";

function BattlePanel() {
    // const {battlePanel} = useSelector((state: RootState) => state.unlockedContent);
    const battle = useSelector((state: RootState) => state.battle);
    const basicStats = useSelector((state: RootState) => state.basicStats);
    const dispatch = useDispatch();
    const start = () => {
        if (battle.isBattleActive || battle.battleCooldown > 0) return;
        const enemies = Object.keys(ENEMIES) as EnemyNames[];
        const roll = Math.ceil(Math.random() * enemies.length) - 1;
        dispatch(
            startBattle({playerAttackPower: basicStats.playerAttackPower, playerAttackSpeed: basicStats.playerAttackSpeed, enemyId: enemies[roll]})
        );
    };

    return (
        //${battlePanel ? "opacity-1" : "opacity-0"}
        <article className={`border rounded-md w-full h-[20rem] p-4 transition-all duration-500 flex flex-col justify-center items-center`}>
            {battle.isBattleActive ? (
                <BattleScreen></BattleScreen>
            ) : (
                <>
                    {battle.battleCooldown > 0 ? <p>{battle.battleCooldown}</p> : null}
                    <button onClick={start} className="px-2 py-2 border hover:border-green-500">
                        Send Rocket
                    </button>
                </>
            )}
        </article>
    );
}

export default BattlePanel;
