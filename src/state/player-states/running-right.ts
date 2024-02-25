import Player from "../../game-objects/player";
import PlayerStates from "../../util/player-states";
import PlayerState from "../player-state";

export default class RunningRightPlayerState extends PlayerState {

    public update(delta: number): void
    {
        const intervalMultiplier = delta/(1000/60);

        super.update(delta);
        this.player.getBody().setAccelerationX(Player.SPEED*intervalMultiplier);
    }
    public enter(): void
    {
        this.player.flipX = false;
        if(this.player.isCollidingBottom()) this.player.anims.play(Player.ANIMATION_NAME);
    }
    public exit(): void
    {
        this.player.anims.pause();
    }
    public handleInput(keys: Phaser.Types.Input.Keyboard.CursorKeys): void
    {
        if(!keys.right.isDown&&this.player.isCollidingBottom())
            this.player.enterState(PlayerStates.IDLE);
        if(keys.space.isDown&&this.player.isCollidingBottom())
            this.player.enterState(PlayerStates.JUMPING);
    }
    
}