import Player from "../../../game-objects/player";
import PlayerStates from "../../../util/player-states";

export default function handleJumpFromKeyboard(e: KeyboardEvent, player: Player)
{
    if(!(e.code === "Space")) return;
    
    player.enterState(PlayerStates.RISING);
}