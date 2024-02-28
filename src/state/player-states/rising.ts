import Player from "../../game-objects/player";
import PlayerStates from "../../util/player-states";
import MobilePlayerState from "./mobile";

export default class RisingPlayerState extends MobilePlayerState {

    public update(delta: number)
    {
        super.update(delta);
        if(this.player.getBody().velocity.y>0)
            this.player.enterState(PlayerStates.FALLING);
    }
    public enter(): void
    {
        this.player.resistence = Player.AIR_RESISTENCE;
        this.player.setFrame(2);
        this.player.getBody().velocity.y = -100;
    }
    public exit(): void {}
}