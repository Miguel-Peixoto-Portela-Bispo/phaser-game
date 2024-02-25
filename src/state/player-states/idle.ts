import PlayerStates from "../../util/player-states";
import PlayerState from "../player-state";

export default class IdlePlayerState extends PlayerState {

    public update(delta: number): void
    {
        const velocity = this.player.getBody().velocity.x;

        super.update(delta);
        if(!this.player.isCollidingBottom()) return;
        if(Math.abs(velocity)>0.85) this.player.setFrame(5);
        else                        this.player.setFrame(0);
    }
    public enter(): void
    {
        if(this.player.isCollidingBottom()) this.player.setFrame(0);
        else                                this.player.setFrame(2);
        this.player.getBody().setAcceleration(0, 0);
    }
    public exit(): void
    {
        
    }
    public handleInput(keys: Phaser.Types.Input.Keyboard.CursorKeys): void
    {
        if(keys.left.isDown)  this.player.enterState(PlayerStates.RUNNING_LEFT);
        if(keys.right.isDown) this.player.enterState(PlayerStates.RUNNING_RIGHT);
        if(keys.space.isDown&&this.player.isCollidingBottom())
            this.player.enterState(PlayerStates.JUMPING);
    }
    
}