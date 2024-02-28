import Player from "../../game-objects/player";
import PlayerStates from "../../util/player-states";
import PointerUtil from "../../util/pointer-util";
import PlayerState from "../player-state";

export default abstract class MobilePlayerState extends PlayerState {

    protected readonly pointerUtil: PointerUtil;

    public constructor(player: Player)
    {
        super(player);
        this.pointerUtil = new PointerUtil(player.scene);
    }

    public update(delta: number)
    {
        super.update(delta);
        this.handleKeyboardInput();
        this.handlePointerInput();
    }
    protected handleKeyboardInput(): void
    {
        const keys = this.player.keys;

        if(keys.left.isDown) this.player.enterState(PlayerStates.MOVING_LEFT);
        if(keys.right.isDown) this.player.enterState(PlayerStates.MOVING_RIGHT);
    }
    protected handlePointerInput = (): void =>
    {
        if(!this.pointerUtil.checkDoubleTap()) return;

        const scene = this.player.scene;
        const x = scene.input.x-scene.cameras.main.centerX;

        if(x<0) this.player.enterState(PlayerStates.MOVING_LEFT);
        else    this.player.enterState(PlayerStates.MOVING_RIGHT);
    }
}