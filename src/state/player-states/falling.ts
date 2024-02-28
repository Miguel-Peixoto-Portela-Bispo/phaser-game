import PlayerStates from "../../util/player-states";
import MobilePlayerState from "./mobile";

export default class FallingPlayerState extends MobilePlayerState {

    public update(delta: number): void
    {
        super.update(delta);
        if(this.player.isCollidingBottom()) this.player.enterState(PlayerStates.IDLE);
    }
    public enter(): void {}
    public exit(): void {}
}