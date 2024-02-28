import Player from "../../../game-objects/player";
import PlayerStates from "../../../util/player-states";
import PointerUtil from "../../../util/pointer-util";

export default function handleJumpFromPointer(pointerUtil: PointerUtil, player: Player): void
{
    const min = 20;
    const max = 160;
    
    if(!pointerUtil.isSwiping(min*-1+360, max*-1+360)) return;

    player.enterState(PlayerStates.RISING);
}