import PlayerStates from "../../util/player-states";
import PlayerState from "../player-state";

export default class InStunPlayerState extends PlayerState {
    private static readonly KNOCK_BACK_FORCE = 150;
    private static readonly MAX_TIME = 800;

    private timer = 0;
    
    public update(delta: number)
    {
        const intervalMultiplier = delta/(1000/60);

        this.player.getBody().velocity.x*=0.945*intervalMultiplier;
        this.handleTimer(delta);
    }
    public enter(): void
    {
        const vec = this.getKnockBackVector();

        this.player.getBody().setAcceleration(0, 0);
        this.player.getBody().setVelocity(vec.x, vec.y);
        this.player.setFrame(5);
    }
    public exit(): void {}
    
    private getKnockBackVector(): Phaser.Math.Vector2
    {
        const angle = this.player.knockBackAngle*(Math.PI/180);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x = cos*InStunPlayerState.KNOCK_BACK_FORCE;
        const y = sin*InStunPlayerState.KNOCK_BACK_FORCE;

        return new Phaser.Math.Vector2(x, y);
    }
    private handleTimer(delta: number)
    {
        this.timer+=delta;
        if(this.timer>=InStunPlayerState.MAX_TIME)
        {
            this.timer = 0;
            this.player.enterState(PlayerStates.IDLE);
        }
    }
}