import PlayerStates from "../../util/player-states";
import PlayerState from "../player-state";

export default class JumpingPlayerState extends PlayerState {
    public update(delta: number)
    {
        super.update(delta);
        if(this.player.isCollidingBottom()&&this.player.getBody().velocity.y>0)
            this.player.enterState(PlayerStates.IDLE);
    }
    public enter(): void
    {
        this.player.setFrame(2);
        this.player.getBody().velocity.y = -100;
    }
    public exit(): void
    {
        
    }
    public handleInput(keys: Phaser.Types.Input.Keyboard.CursorKeys): void
    {
        if(keys.left.isDown) this.player.enterState(PlayerStates.RUNNING_LEFT);
        if(keys.right.isDown) this.player.enterState(PlayerStates.RUNNING_RIGHT);
    }
    
    
}