import Player from "../../game-objects/player";
import MobilePlayerState from "./mobile";
import handleJumpFromKeyboard from "./util/jump-from-keyboard";
import handleJumpFromPointer from "./util/jump-from-pointer";

export default class IdlePlayerState extends MobilePlayerState {

    public update(delta: number): void
    {
        const velocity = this.player.getBody().velocity.x;
        const intervalMultiplier = delta/(1000/60);

        super.update(delta);
        this.player.getBody().velocity.x*=0.955*intervalMultiplier;
        if(Math.abs(velocity)>0.92) this.player.setFrame(5);
        else                        this.player.setFrame(0);
    }
    public enter(): void
    {
        const input = this.player.scene.input;

        this.player.resistence = Player.GROUND_RESISTENCE;
        this.player.setFrame(0);
        this.player.getBody().setAcceleration(0, 0);
        input.keyboard?.on("keydown", this.handleKeyDown);
        input.on("pointermove", this.handlePointerMove);
    }
    public exit(): void
    {
        const input = this.player.scene.input;

        input.keyboard?.off("keydown", this.handleKeyDown);
        input.off("pointermove", this.handlePointerMove);
    }

    private handleKeyDown = (e: KeyboardEvent): void =>
    {
        handleJumpFromKeyboard(e, this.player);
    }

    protected handlePointerMove = (): void =>
    {
        handleJumpFromPointer(this.pointerUtil, this.player);
    }
}