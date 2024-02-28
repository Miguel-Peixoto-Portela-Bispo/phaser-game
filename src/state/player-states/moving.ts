import Player from "../../game-objects/player";
import getIntervalMultiplier from "../../util/get-interval-multiplier";
import PlayerStates from "../../util/player-states";
import PointerUtil from "../../util/pointer-util";
import PlayerState from "../player-state";
import handleJumpFromKeyboard from "./util/jump-from-keyboard";
import handleJumpFromPointer from "./util/jump-from-pointer";

export default abstract class MovingPlayerState extends PlayerState {

    private enteredInMidAir = false;
    private readonly KEY_CODE: string;
    private readonly DIRECTION: number;
    private pointerUtil: PointerUtil;

    public constructor(player: Player, keyCode: string, direction: number)
    {
        super(player);
        this.KEY_CODE = keyCode;
        this.DIRECTION = direction;
        this.pointerUtil = new PointerUtil(player.scene);
    }

    public enter(): void
    {
        this.initInputs();
        this.player.flipX = this.DIRECTION<0?true:false;
        this.enteredInMidAir = !this.player.isCollidingBottom();
        if(this.player.isCollidingBottom()) this.player.anims.play(Player.ANIMATION_NAME);
    }
    public exit(): void
    {
        this.removeInputs();
        this.player.anims.pause();
    }
    public update(delta: number): void
    {
        const multiplier = getIntervalMultiplier(delta);

        super.update(delta);
        this.player.getBody().setAccelerationX(Player.SPEED*multiplier*this.DIRECTION);
        if(this.enteredInMidAir) this.player.enterState(PlayerStates.FALLING)
    }

    private handleKeyUp = (e: KeyboardEvent): void =>
    {
        if(e.code === this.KEY_CODE) this.enterMobileState();
    }
    private handleKeyDown = (e: KeyboardEvent): void =>
    {
        if(this.player.isCollidingBottom()) handleJumpFromKeyboard(e, this.player);
    }
    private initInputs(): void
    {
        const input = this.player.scene.input;

        input.keyboard?.on("keyup", this.handleKeyUp);
        input.keyboard?.on("keydown", this.handleKeyDown);
        input.on("pointermove", this.handlePointerMove);
        input.on("pointerup", this.enterMobileState);
    }
    private removeInputs(): void
    {
        const input = this.player.scene.input;

        input.keyboard?.off("keyup", this.handleKeyUp);
        input.keyboard?.off("keydown", this.handleKeyDown);
        input.off("pointermove", this.handlePointerMove);
        input.off("pointerup", this.enterMobileState);
    }
    private handlePointerMove = (): void =>
    {
        if(!this.player.isCollidingBottom()) return;
        
        handleJumpFromPointer(this.pointerUtil, this.player);
    }
    private enterMobileState = (): void =>
    {
        if(this.player.isCollidingBottom()) this.player.enterState(PlayerStates.IDLE);
        else                                this.player.enterState(PlayerStates.FALLING);
    }
}