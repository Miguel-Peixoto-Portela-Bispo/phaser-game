import Player from "../../../game-objects/player";
import PlayerStates from "../../../util/player-states";
import PointerUtil from "../../../util/pointer-util";

export default function handleJumpFromPointer(pointerUtil: PointerUtil, player: Player): void
{
    if(!pointerUtil.isSwiping(20, 160)) return;

    player.enterState(PlayerStates.RISING);
    console.log("aaa")
}