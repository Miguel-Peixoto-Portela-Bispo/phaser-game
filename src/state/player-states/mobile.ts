import Player from "../../game-objects/player";
import PlayerStates from "../../util/player-states";
import PointerUtil from "../../util/pointer-util";
import PlayerState from "../player-state";
import handleJumpFromPointer from "./util/jump-from-pointer";

export default abstract class MobilePlayerState extends PlayerState {

    private readonly pointerUtil: PointerUtil;

    public constructor(player: Player)
    {
        super(player);
        this.pointerUtil = new PointerUtil(player.scene);
        player.scene.input.on("pointerdown", this.handlePointerDown.bind(this));
    }

    public update(delta: number)
    {
        this.handleKeyboardInput();
    }
    public abstract enter(): void;
    public abstract exit(): void;
    protected handleKeyboardInput(): void
    {
        const keys = this.player.keys;

        if(keys.left.isDown) this.player.enterState(PlayerStates.MOVING_LEFT);
        if(keys.right.isDown) this.player.enterState(PlayerStates.MOVING_RIGHT);
    }
    protected handlePointerDown(): void
    {
        handleJumpFromPointer(this.pointerUtil, this.player);
        
        if(!this.pointerUtil.checkDoubleTap()) return;

        const scene = this.player.scene;
        const x = scene.input.x-scene.cameras.main.centerX;

        if(x<0) this.player.enterState(PlayerStates.MOVING_LEFT);
        else    this.player.enterState(PlayerStates.MOVING_RIGHT);
    }
}