import Player from "../game-objects/player";
import getIntervalMultiplier from "../util/get-interval-multiplier";
import State from "./state";

export default abstract class PlayerState implements State {

    protected player: Player;

    public constructor(player: Player)
    {
        this.player = player;
    }

    public update(delta: number): void
    {
        const multiplier = getIntervalMultiplier(delta);

        this.player.getBody().velocity.x*=this.player.resistence*multiplier;
    }
    public abstract enter(): void;
    public abstract exit(): void;
}